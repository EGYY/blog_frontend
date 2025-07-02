import { StateSchema } from '@/app/providers/StoreProvider';

export const getAccessToken = (state: StateSchema) => state.user.userData?.accessToken;
