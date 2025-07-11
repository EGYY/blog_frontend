import { StateSchema } from '@/app/providers/StoreProvider';

export const getProfileDetail = (state: StateSchema) => state.profile_detail?.profile;
