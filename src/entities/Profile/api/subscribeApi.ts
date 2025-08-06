import { Subscribe } from '../model/types/profile';

import { rtkApi } from '@/shared/config/api/rtkApi';

export interface SubcribeApiError {
    status: number;
    data: {
        error: string;
        statusCode: number;
        message: string;
    };
}

const subscribeApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        subscribe: build.mutation<Subscribe[], string>({
            query: (id) => ({
                url: `/subscriptions/subscribe/${id}`,
                method: 'POST',
            }),
            transformErrorResponse: (
                response: SubcribeApiError,
            ): SubcribeApiError => {
                return response;
            },
        }),
        unsubscribe: build.mutation<Subscribe[], string>({
            query: (id) => ({
                url: `/subscriptions/unsubscribe/${id}`,
                method: 'DELETE',
            }),
            transformErrorResponse: (
                response: SubcribeApiError,
            ): SubcribeApiError => {
                return response;
            },
        }),
    }),
});

export const useSubscribeQuery = subscribeApi.useSubscribeMutation;
export const useUnsubscribeQuery = subscribeApi.useUnsubscribeMutation;
