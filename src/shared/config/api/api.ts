import axios, { CreateAxiosDefaults } from 'axios';
import Cookies from 'js-cookie';

// eslint-disable-next-line egyy-plugin/layer-imports
import { UserServerResponse } from '@/entities/User';
import { errorCatch } from '@/shared/lib/api/helper';

const options: CreateAxiosDefaults = {
    baseURL: __SERVER_URL__,
    withCredentials: true,
};

const axiosClassic = axios.create(options);
const axiosWithAuth = axios.create(options);

export const getNewTokens = async () => {
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
    const isOptionalAuthRequest = config.headers?.['x-public'];
    const accessToken = Cookies.get('accessToken');

    if (!accessToken && !isOptionalAuthRequest) {
        return Promise.reject(new axios.Cancel('No access or refresh token'));
    }

    if (config?.headers && accessToken && !isOptionalAuthRequest)
        config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
});

axiosWithAuth.interceptors.response.use(
    (config) => config,
    async (error) => {
        const originalRequest = error.config;

        if (
            (error?.response?.status === 401 ||
                errorCatch(error) === 'jwt expried' ||
                errorCatch(error) === 'jwt must be provided') &&
            error.config &&
            !error.config._isRetry
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
