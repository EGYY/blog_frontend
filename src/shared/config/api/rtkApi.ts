import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import type { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

import { axiosClassic, axiosWithAuth, getNewTokens } from './api';

import { errorCatch } from '@/shared/lib/api/helper';

type AxiosBaseQueryArgs = {
    url: string;
    method?: AxiosRequestConfig['method'];
    data?: AxiosRequestConfig['data'];
    params?: AxiosRequestConfig['params'];
    headers?: AxiosRequestConfig['headers'];
};

const axiosBaseQuery =
    (
        axiosInstance: typeof axiosWithAuth,
    ): BaseQueryFn<AxiosBaseQueryArgs, unknown, unknown> =>
    async ({
        url,
        method = 'GET',
        data,
        params,
        headers,
    }: AxiosBaseQueryArgs) => {
        try {
            const result = await axiosInstance({
                url,
                method,
                data,
                params,
                headers,
            });
            return result;
        } catch (error: any) {
            const err = error;
            if (
                axiosInstance === axiosWithAuth &&
                (err?.response?.status === 401 ||
                    errorCatch(err) === 'jwt expired' ||
                    errorCatch(err) === 'jwt must be provided') &&
                !err.config?._isRetry
            ) {
                err.config._isRetry = true;
                try {
                    await getNewTokens();
                    const retryResult = await axiosWithAuth(err.config);
                    return { data: retryResult.data };
                } catch (retryError) {
                    Cookies.remove('accessToken');
                    return { error: { status: 401, data: 'Unauthorized' } };
                }
            }

            return {
                error: {
                    status: err.response?.status || 500,
                    data: err.response?.data || err.message,
                },
            };
        }
    };

const baseQueryWithAuth = axiosBaseQuery(axiosWithAuth);
const baseQueryPublic = axiosBaseQuery(axiosClassic);

const baseQuery: BaseQueryFn<AxiosBaseQueryArgs, unknown, unknown> = async (
    args,
    api,
    extraOptions,
) => {
    const isPublic =
        typeof args === 'object' &&
        'headers' in args &&
        args.headers?.['x-public'];

    if (isPublic) {
        if (args.headers) delete args.headers['x-public'];
        return baseQueryPublic(args, api, extraOptions);
    }

    return baseQueryWithAuth(args, api, extraOptions);
};

export const rtkApi = createApi({
    reducerPath: 'api',
    baseQuery,
    endpoints: () => ({}),
});
