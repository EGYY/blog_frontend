import { StateSchema } from '@/app/providers/StoreProvider';

export const getErrorAuthByEmail = (state: StateSchema) => state?.auth?.error;
