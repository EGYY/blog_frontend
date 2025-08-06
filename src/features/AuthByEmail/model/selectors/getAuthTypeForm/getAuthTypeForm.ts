import { StateSchema } from '@/app/providers/StoreProvider';

export const getAuthTypeForm = (state: StateSchema) =>
    state?.auth?.typeForm || 'auth';
