import { StateSchema } from '@/app/providers/StoreProvider';

export const getMainPageSelectedCategory = (state: StateSchema) => state.main_page?.selectedCategory;
