import { StateSchema } from '@/app/providers/StoreProvider';

export const getErrorUpdateProfile = (state: StateSchema) =>
    state?.update_profile?.error;
