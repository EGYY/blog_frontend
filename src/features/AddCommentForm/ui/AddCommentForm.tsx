import {
  ChangeEvent, memo, useCallback,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/Button/Button';
import { Textarea } from '@/shared/ui/Textarea/Textarea';
import cls from './AddCommentForm.module.scss';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { addCommentFormActions, addCommentFormReducer } from '../model/slice/addCommentFormSlice';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getCommentFormContent } from '../model/selectors/getCommentFormContent/getCommentFormContent';

const initialReducers: ReducersList = {
  comment_form: addCommentFormReducer,
};

interface AddCommentFormProps {
    className?: string
    onSubmitForm: (content: string) => void
    loading: boolean
    error?: string
}

export const AddCommentForm = memo((props: AddCommentFormProps) => {
  const {
    className, onSubmitForm, loading, error,
  } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const content = useSelector(getCommentFormContent);

  const handleSubmitForm = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const content = formData.get('content') as string;
    onSubmitForm(content);
  }, [onSubmitForm]);

  const onChangeContent = useCallback((val: string) => {
    dispatch(addCommentFormActions.setContent(val));
  }, [dispatch]);

  const onChangeContentHandler = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.currentTarget.value;
    onChangeContent(content);
  }, [onChangeContent]);

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <form onSubmit={handleSubmitForm} className={classNames(cls.addCommentFormWrapper, {}, [className])}>
        <Textarea
          value={content}
          onChange={onChangeContentHandler}
          disabled={loading}
          placeholder={t('comment_form_placeholder')}
          name="content"
          error={error}
        />
        <Button type="submit" disabled={loading || !content}>{t('comment_form_send')}</Button>
      </form>
    </DynamicModuleLoader>
  );
});
