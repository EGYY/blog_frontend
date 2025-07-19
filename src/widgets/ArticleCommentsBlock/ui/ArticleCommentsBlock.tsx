import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { memo, useCallback, useEffect } from 'react';
import { Tag } from '@/shared/ui/Tag/Tag';
import cls from './ArticleCommentsBlock.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AddCommentForm, addCommentFormActions } from '@/features/AddCommentForm';
import { CommentList } from '@/entities/Comment';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articleCommentsBlockReducer } from '../model/slice/articleCommentsBlockSlice';
import { getTotalArticleComments } from '../model/selectors/getTotalComments/getTotalArticleComments';
import { getArticleCommentsLoading } from '../model/selectors/getArticleLoading/getArticleCommentsLoading';
import { getArticleComments as getArticleCommentsSelector } from '../model/selectors/getArticleComments/getArticleComments';
import { getArticleFormLoading } from '../model/selectors/getArticleFormLoading/getArticleFormLoading';
import { getArticleFormError } from '../model/selectors/getArticleFormError/getArticleFormError';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { addCommentToArticle } from '../model/services/addCommentToArticle';
import { getArticleComments } from '../model/services/getArticleComments';

const initialReducers: ReducersList = {
  article_comments_block: articleCommentsBlockReducer,
};

interface ArticleCommentsBlockProps {
    articleId: string
    className?: string
}

const ArticleCommentsBlock = memo((props: ArticleCommentsBlockProps) => {
  const { articleId, className } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const totalComments = useSelector(getTotalArticleComments);
  const comments = useSelector(getArticleCommentsSelector);
  const loadingComments = useSelector(getArticleCommentsLoading);
  const formLoading = useSelector(getArticleFormLoading);
  const formError = useSelector(getArticleFormError);

  useEffect(() => {
    if (articleId) {
      dispatch(getArticleComments(articleId));
    }
  }, [articleId, dispatch]);

  const onSubmitCommentFormHandler = useCallback((content: string) => {
    dispatch(addCommentToArticle({ articleId, content })).then(() => dispatch(addCommentFormActions.setContent('')));
  }, [articleId, dispatch]);

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <div className={classNames(cls.articleCommentsBlockWrapper, {}, [className])}>
        <div className={cls.commentListHeader}>
          <h2>{t('comment_block_title')}</h2>
          <Tag>
            {totalComments}
            {' '}
            {t('comment_block_total')}
          </Tag>
        </div>
        <AddCommentForm
          loading={formLoading}
          error={formError}
          onSubmitForm={onSubmitCommentFormHandler}
        />
        <CommentList data={comments} loading={loadingComments} />
      </div>
    </DynamicModuleLoader>
  );
});

export default memo(ArticleCommentsBlock);
