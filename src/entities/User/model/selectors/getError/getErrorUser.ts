import { StateSchema } from '@/app/providers/StoreProvider';

export const getErrorUser = (state: StateSchema) => state.user.error;
