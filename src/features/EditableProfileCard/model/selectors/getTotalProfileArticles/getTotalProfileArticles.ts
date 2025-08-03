import { StateSchema } from '@/app/providers/StoreProvider';

export const getTotalProfileArticles = (state: StateSchema) => state?.update_profile?.totalArticles || 0;
