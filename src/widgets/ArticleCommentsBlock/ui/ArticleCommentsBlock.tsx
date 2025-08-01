import { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getArticleComments as getArticleCommentsSelector } from '../model/selectors/getArticleComments/getArticleComments';
import { getArticleCommentsPage } from '../model/selectors/getArticleCommentsPage/getArticleCommentsPage';
import { getArticleCommentsTotalPages } from '../model/selectors/getArticleCommentsTotalPages/getArticleCommentsTotalPages';
import { getArticleFormError } from '../model/selectors/getArticleFormError/getArticleFormError';
import { getArticleFormLoading } from '../model/selectors/getArticleFormLoading/getArticleFormLoading';
import { getArticleCommentsLoading } from '../model/selectors/getArticleLoading/getArticleCommentsLoading';
import { getTotalArticleComments } from '../model/selectors/getTotalComments/getTotalArticleComments';
import { addCommentToArticle } from '../model/services/addCommentToArticle';
import { getArticleComments } from '../model/services/getArticleComments';
import { articleCommentsBlockActions, articleCommentsBlockReducer } from '../model/slice/articleCommentsBlockSlice';

import { CommentList } from '@/entities/Comment';
import { AddCommentForm, addCommentFormActions } from '@/features/AddCommentForm';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import Pagination from '@/shared/ui/Pagination/Pagination';
import { Tag } from '@/shared/ui/Tag/Tag';

import cls from './ArticleCommentsBlock.module.scss';

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
  const page = useSelector(getArticleCommentsPage);
  const totalPages = useSelector(getArticleCommentsTotalPages);
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

  const handleChangePage = useCallback((newPage: number) => {
    dispatch(articleCommentsBlockActions.setPage(newPage));
    dispatch(getArticleComments(articleId));
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
        {comments.length > 0 && (
          <Pagination
            className={cls.pagination}
            currentPage={page}
            totalPages={totalPages}
            maxVisible={5}
            onPageChange={handleChangePage}
          />
        )}

      </div>
    </DynamicModuleLoader>
  );
});

export default memo(ArticleCommentsBlock);
