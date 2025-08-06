import { Notification } from '../model/types/notification';

import { rtkApi } from '@/shared/config/api/rtkApi';

const notificationApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getNotifications: build.query<Notification[], void>({
            query: () => ({
                url: '/notifications',
                method: 'GET',
            }),
        }),
    }),
});

export const useNotifications = notificationApi.useGetNotificationsQuery;
