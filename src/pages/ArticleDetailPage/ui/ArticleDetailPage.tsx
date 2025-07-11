import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Article,
  getArticle, getArticleData, getArticleError, getArticleLoading,
} from '@/entities/Article';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articleReducer } from '@/entities/Article/model/slice/articleSlice';
import { ArticleCommentsBlock } from '@/widgets/ArticleCommentsBlock';

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
    <DynamicModuleLoader reducers={initialReducers}>
      <Article
        article={article}
        loadingArticle={loadingArticle}
        errorArticle={errorArticle}
      />
      {id && <ArticleCommentsBlock articleId={id} />}
    </DynamicModuleLoader>
  );
};

export default ArticleDetailPage;
