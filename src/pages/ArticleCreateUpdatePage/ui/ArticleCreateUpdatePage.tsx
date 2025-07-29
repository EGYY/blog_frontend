import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getArticleData, getArticle, articleReducer } from '@/entities/Article';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ArticleCreateUpdate, articleCreateUpdateReducer } from '@/widgets/ArticleCreateUpdate';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { PageWrapper } from '@/widgets/PageWrapper';

const initialReducers: ReducersList = {
  article: articleReducer,
  article_create_update: articleCreateUpdateReducer,
};

const ArticleCreateUpdatePage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const article = useSelector(getArticle);

  useEffect(() => {
    if (id) {
      dispatch(getArticleData(id));
    }
  }, [id, dispatch]);

  return (
    <DynamicModuleLoader reducers={initialReducers} removeAfterAnmount>
      <PageWrapper>
        <ArticleCreateUpdate article={article} type={id ? 'update' : 'create'} />
      </PageWrapper>
    </DynamicModuleLoader>
  );
};

export default ArticleCreateUpdatePage;
