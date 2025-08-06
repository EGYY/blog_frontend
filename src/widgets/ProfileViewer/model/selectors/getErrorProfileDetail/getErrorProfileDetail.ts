import { StateSchema } from '@/app/providers/StoreProvider';

export const getErrorProfileDetail = (state: StateSchema) =>
    state.profile_detail?.error || '';
