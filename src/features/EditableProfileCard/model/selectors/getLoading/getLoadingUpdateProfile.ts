import { StateSchema } from '@/app/providers/StoreProvider';

export const getLoadingUpdateProfile = (state: StateSchema) => state?.update_profile?.loading;
