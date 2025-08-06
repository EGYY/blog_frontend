import { StateSchema } from '@/app/providers/StoreProvider';

export const getLoadingProfileDetail = (state: StateSchema) =>
    state.profile_detail?.loading || false;
