import { StateSchema } from '@/app/providers/StoreProvider';

export const getProfileArticlesSelector = (state: StateSchema) =>
    state?.update_profile?.articles || [];
