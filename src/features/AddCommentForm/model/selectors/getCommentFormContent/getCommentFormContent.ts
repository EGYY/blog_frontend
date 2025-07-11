import { StateSchema } from '@/app/providers/StoreProvider';

export const getCommentFormContent = (state: StateSchema) => state?.comment_form?.content || '';
