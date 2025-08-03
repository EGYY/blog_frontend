import { StateSchema } from '@/app/providers/StoreProvider';

export const getLoadingProfileArticles = (state: StateSchema) => state?.update_profile?.loadingArtilces || false;
