import {
  ChangeEvent,
  memo,
  useCallback, useEffect, useMemo,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ArticleType } from '@/entities/Article';
import { useArticleCategoriesQuery } from '@/entities/ArticleCategory';
import { HtmlEditor } from '@/features/HtmlEditor';
import CalendarIcon from '@/shared/assets/calendar.svg';
import EyeIcon from '@/shared/assets/eye.svg';
import HeartIcon from '@/shared/assets/heart.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { formatDate } from '@/shared/lib/helpers/formatDate/formatDate';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button } from '@/shared/ui/Button/Button';
import { ImageUpload } from '@/shared/ui/Image/ImageUpload';
import { Input } from '@/shared/ui/Input/Input';
import { Select } from '@/shared/ui/Select/Select';
import { Tooltip } from '@/shared/ui/Tooltip/Tooltip';
import { getArticleCategory } from '../model/selectors/getArticleCategory/getArticleCategory';
import { getArticleContent } from '../model/selectors/getArticleContent/getArticleContent';
import { getArticleError } from '../model/selectors/getArticleError/getArticleError';
import { getArticleLoading } from '../model/selectors/getArticleLoading/getArticleLoading';
import { getArticlePoster } from '../model/selectors/getArticlePoster/getArticlePoster';
import { getArticlePosterFile } from '../model/selectors/getArticlePosterFile/getArticlePosterFile';
import { getArticleSubtitle } from '../model/selectors/getArticleSubtitle/getArticleSubtitle';
import { getArticleCreateUpdateTags } from '../model/selectors/getArticleTags/getArticleTags';
import { getArticleTitle } from '../model/selectors/getArticleTitle/getArticleTitle';
import { createArticle } from '../model/services/createArticle/createArticle';
import { updateArticle } from '../model/services/updateArticle/updateArticle';
import { articleCreateUpdateActions } from '../model/slice/articleCreateUpdateSlice';
import cls from './ArticleCreateUpdate.module.scss';
import { useArticleTagsQuery } from '@/entities/ArticleTag';

interface ArticleCreateUpdateProps {
  className?: string
  article?: ArticleType
  type?: 'create' | 'update'
}

export const ArticleCreateUpdate = memo((props: ArticleCreateUpdateProps) => {
  const {
    className,
    article,
    type = 'create',
  } = props;
  const dispatch = useAppDispatch();
  const { t } = useTranslation('article');

  const { data: categories } = useArticleCategoriesQuery();
  const { data: tags } = useArticleTagsQuery();

  const loading = useSelector(getArticleLoading);
  const error = useSelector(getArticleError);

  const title = useSelector(getArticleTitle);
  const subtitle = useSelector(getArticleSubtitle);
  const category = useSelector(getArticleCategory);
  const selectedTags = useSelector(getArticleCreateUpdateTags);
  const poster = useSelector(getArticlePoster);
  const posterFile = useSelector(getArticlePosterFile);
  const html = useSelector(getArticleContent);

  useEffect(() => {
    dispatch(articleCreateUpdateActions.initDefaultData(article));
  }, [dispatch, article]);

  const filterCategories = useMemo(() => {
    if (categories && categories?.length > 0) {
      return categories?.map((category) => ({ label: category.name, value: category.id }));
    }
    return [];
  }, [categories]);

  const filterTags = useMemo(() => {
    if (tags && tags?.length > 0) {
      return tags?.map((tag) => ({ label: tag.name, value: tag.id }));
    }
    return [];
  }, [tags]);

  const onChangeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch(articleCreateUpdateActions.setArticleTitle(e.currentTarget.value));
  }, [dispatch]);

  const onChangeSubtitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch(articleCreateUpdateActions.setArticleSubtitle(e.currentTarget.value));
  }, [dispatch]);

  const onChageCategory = useCallback((val: string) => {
    dispatch(articleCreateUpdateActions.setArticleCategory(val));
  }, [dispatch]);

  const onChageTags = useCallback((val: string[]) => {
    dispatch(articleCreateUpdateActions.setArticleTags(val));
  }, [dispatch]);

  const onChangePoster = useCallback((file: File) => {
    dispatch(articleCreateUpdateActions.setArticlePosterFile(file));
  }, [dispatch]);

  const onChangeHtml = useCallback((val: string) => {
    dispatch(articleCreateUpdateActions.setArticleContent(val));
  }, [dispatch]);

  const submit = useCallback(() => {
    const form = new FormData();

    const fields: [string, any][] = [
      ['title', title],
      ['subtitle', subtitle],
      ['content', html],
      ['categoryId', category],
      ['tagIds', selectedTags ? selectedTags.join(',') : null],
      ['poster', posterFile],
    ];

    fields.forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        form.append(key, value);
      }
    });

    if (type === 'create') {
      dispatch(createArticle(form));
    } else if (type === 'update' && article?.id) {
      dispatch(updateArticle({ id: article.id, body: form }));
    }
  }, [article?.id, category, dispatch, html, posterFile, subtitle, selectedTags, title, type]);

  return (
    <article className={classNames(cls.articleWrapper, {}, [className])}>
      <div className={cls.articleContent}>
        <div className={cls.articleTitle}>
          <Input label={t('title')} value={title} onChange={onChangeTitle} />
        </div>
        <div className={cls.articleSubtitle}>
          <Input label={t('subtitle')} value={subtitle} onChange={onChangeSubtitle} />
        </div>
        <div className={cls.articleInfo}>
          <span>
            <CalendarIcon />
            {formatDate(article?.createdAt || new Date().toISOString())}
          </span>
          <span>
            <EyeIcon />
            {article?.viewsCount || 0}
          </span>
          <span>
            <HeartIcon />
            {article?.likesCount || 0}
          </span>
        </div>
        <div className={cls.selectors}>
          <Select
            value={category}
            onChange={(val) => onChageCategory(val as string)}
            options={filterCategories}
            label={t('category_label')}
            placeholder={t('select_placeholder')}
            className={cls.articleFilterSelect}
          />
          <Select
            multiple
            value={selectedTags}
            onChange={(val) => onChageTags(val as string[])}
            options={filterTags}
            label={t('tag_label')}
            placeholder={t('select_placeholder')}
            className={cls.articleFilterSelect}
          />
        </div>
      </div>
      <div className={cls.artticlePoster}>
        <Tooltip content={t('upload_image')} preferredPlacement="top">
          <ImageUpload src={`${__SERVER_URL__}${poster}`} alt={title} onChangeImage={onChangePoster} />
        </Tooltip>
      </div>
      <div className={classNames('separator', {}, [cls.separator])} />
      <b>{t('content')}</b>
      <HtmlEditor html={html} onChangeContent={onChangeHtml} />
      <Button type="button" onClick={submit} loading={loading}>
        {type === 'create' ? t('create_article') : t('update_article')}
      </Button>
    </article>
  );
});
