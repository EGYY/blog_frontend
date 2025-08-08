import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation, useParams } from 'react-router-dom';

import { getArticleData, getArticle, articleReducer } from '@/entities/Article';
import { getUser } from '@/entities/User';
import { getRouteForbidden } from '@/shared/config/routes/routes';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppEffect } from '@/shared/lib/hooks/useAppEffect/useAppEffect';
import {
    ArticleCreateUpdate,
    articleCreateUpdateReducer,
} from '@/widgets/ArticleCreateUpdate';
import { PageWrapper } from '@/widgets/PageWrapper';

const initialReducers: ReducersList = {
    article: articleReducer,
    article_create_update: articleCreateUpdateReducer,
};

const ArticleCreateUpdatePage = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const location = useLocation();

    const article = useSelector(getArticle);
    const user = useSelector(getUser);

    useAppEffect(() => {
        if (id) {
            dispatch(getArticleData(id));
        }
    }, [id, dispatch]);

    const canUserEditArticle = useMemo(() => {
        if (
            (article?.author.id && user?.id && article.author.id === user.id) ||
            user?.role === 'ADMIN'
        ) {
            return true;
        }
        return false;
    }, [article, user]);

    if (!canUserEditArticle && id) {
        return (
            <Navigate
                to={getRouteForbidden()}
                state={{ from: location }}
                replace
            />
        );
    }

    return (
        <DynamicModuleLoader reducers={initialReducers} removeAfterAnmount>
            <PageWrapper>
                <ArticleCreateUpdate
                    article={article}
                    type={id ? 'update' : 'create'}
                />
            </PageWrapper>
        </DynamicModuleLoader>
    );
};

export default ArticleCreateUpdatePage;
