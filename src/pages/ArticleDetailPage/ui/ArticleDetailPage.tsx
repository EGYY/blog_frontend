import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Article,
  articleReducer,
  getArticle, getArticleData, getArticleError, getArticleLoading,
} from '@/entities/Article';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ArticleCommentsBlock } from '@/widgets/ArticleCommentsBlock';
import { PageWrapper } from '@/widgets/PageWrapper/PageWrapper';

const initialReducers: ReducersList = {
  article: articleReducer,
};

const ArticleDetailPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const article = useSelector(getArticle);
  const loadingArticle = useSelector(getArticleLoading);
  const errorArticle = useSelector(getArticleError);

  useEffect(() => {
    if (id) {
      dispatch(getArticleData(id));
    }
  }, [dispatch, id]);

  return (
    <DynamicModuleLoader reducers={initialReducers} removeAfterAnmount={false}>
      <PageWrapper>
        <Article
          article={article}
          loadingArticle={loadingArticle}
          errorArticle={errorArticle}
        />
        {id && <ArticleCommentsBlock articleId={id} />}
      </PageWrapper>
    </DynamicModuleLoader>
  );
};

export default ArticleDetailPage;
