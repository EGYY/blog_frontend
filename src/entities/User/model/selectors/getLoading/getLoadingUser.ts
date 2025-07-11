import { StateSchema } from '@/app/providers/StoreProvider';

export const getLoadingUser = (state: StateSchema) => state.user.loading;
