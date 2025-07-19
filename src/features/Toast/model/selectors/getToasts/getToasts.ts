import { StateSchema } from '@/app/providers/StoreProvider';

export const getToasts = (state: StateSchema) => state?.toasts?.items || [];
