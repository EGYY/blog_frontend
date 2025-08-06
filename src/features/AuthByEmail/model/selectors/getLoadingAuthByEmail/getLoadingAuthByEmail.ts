import { StateSchema } from '@/app/providers/StoreProvider';

export const getLoadingAuthByEmail = (state: StateSchema) =>
    state?.auth?.loading || false;
