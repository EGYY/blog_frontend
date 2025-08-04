import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { getArticleData, getArticle, articleReducer } from '@/entities/Article';
import { getUser } from '@/entities/User';
import { getRouteArticles } from '@/shared/config/routes/routes';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppEffect } from '@/shared/lib/hooks/useAppEffect/useAppEffect';
import { ArticleCreateUpdate, articleCreateUpdateReducer } from '@/widgets/ArticleCreateUpdate';
import { PageError } from '@/widgets/PageError';
import { PageWrapper } from '@/widgets/PageWrapper';

const initialReducers: ReducersList = {
  article: articleReducer,
  article_create_update: articleCreateUpdateReducer,
};

const ArticleCreateUpdatePage = () => {
  const { t } = useTranslation('article');
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const article = useSelector(getArticle);
  const user = useSelector(getUser);

  useAppEffect(() => {
    if (id) {
      dispatch(getArticleData(id));
    }
  }, [id, dispatch]);

  const canUserEditArticle = useMemo(() => {
    if (((article?.author.id && user?.id) && (article.author.id === user.id)) || user?.role === 'ADMIN') {
      return true;
    }
    return false;
  }, [article, user]);

  if (!canUserEditArticle && id) {
    return (
      <DynamicModuleLoader reducers={initialReducers} removeAfterAnmount>
        <PageWrapper>
          <PageError
            errorTitle={t('access_denied')}
            errorDescription={t('access_denied_description')}
            actionText={t('access_denied_action_text')}
            actionHandler={() => navigate(getRouteArticles())}
          />
        </PageWrapper>
      </DynamicModuleLoader>
    );
  }

  return (
    <DynamicModuleLoader reducers={initialReducers} removeAfterAnmount>
      <PageWrapper>
        <ArticleCreateUpdate article={article} type={id ? 'update' : 'create'} />
      </PageWrapper>
    </DynamicModuleLoader>
  );
};

export default ArticleCreateUpdatePage;
