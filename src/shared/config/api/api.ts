import axios, { CreateAxiosDefaults } from 'axios';
import Cookies from 'js-cookie';
import { UserServerResponse } from '@/entities/User';

export const SERVER_URL = 'http://localhost:5000';

const options: CreateAxiosDefaults = {
  baseURL: SERVER_URL,
  withCredentials: true,
};

const axiosClassic = axios.create(options);
const axiosWithAuth = axios.create(options);

const errorCatch = (error: any): string => {
  const message = error?.response?.data?.message;

  // eslint-disable-next-line no-nested-ternary
  return message
    ? typeof error.response.data.message === 'object'
      ? message[0]
      : message
    : error.message;
};

const getNewTokens = async () => {
  const response = await axiosClassic<UserServerResponse>({
    url: '/auth/login/access-token',
    method: 'POST',
  });

  if (response.data.accessToken) {
    Cookies.set('accessToken', response.data.accessToken, {
      domain: 'localhost',
      sameSite: 'strict',
      expires: 1,
    });
  }

  return response;
};

axiosWithAuth.interceptors.request.use((config) => {
  const accessToken = Cookies.get('accessToken') || null;

  if (config?.headers && accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

axiosWithAuth.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;

    if (
      (
        error?.response?.status === 401
        || errorCatch(error) === 'jwt expried'
        || errorCatch(error) === 'jwt must be provided')
        && error.config
        && !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        await getNewTokens();
        return axiosWithAuth.request(originalRequest);
      } catch (error) {
        if (errorCatch(error) === 'jwt expired') {
          Cookies.remove('accessToken');
        }
      }
    }

    throw error;
  },
);

export { axiosClassic, axiosWithAuth };
