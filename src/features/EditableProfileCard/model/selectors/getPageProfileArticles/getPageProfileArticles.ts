import { StateSchema } from '@/app/providers/StoreProvider';

export const getPageProfileArticles = (state: StateSchema) =>
    state?.update_profile?.pageArticles || 1;
