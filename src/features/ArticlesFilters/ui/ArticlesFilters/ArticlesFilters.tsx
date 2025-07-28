import {
  ChangeEvent,
  memo,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Input } from '@/shared/ui/Input/Input';
import { Select } from '@/shared/ui/Select/Select';
import { getArticleFilterSearchText } from '../../model/selectors/getArticleFilterSearchText/getArticleFilterSearchText';
import {
  getArticleFilterSelectedCategories,
} from '../../model/selectors/getArticleFilterSelectedCategories/getArticleFilterSelectedCategories';
import {
  getArticleFilterSelectedTags,
} from '../../model/selectors/getArticleFilterSelectedTags/getArticleFilterSelectedTags';
import { getArticleFilterSort } from '../../model/selectors/getArticleFilterSort/getArticleFilterSort';
import { articlesFiltersActions } from '../../model/slice/articlesFiltersSlice';
import cls from './ArticleFilters.module.scss';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { useArticleCategoriesQuery } from '@/entities/ArticleCategory';
import { useArticleTagsQuery } from '@/entities/ArticleTag';

export const ArticlesFilters = memo(() => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('article');
  const { data: categories } = useArticleCategoriesQuery();
  const { data: tags } = useArticleTagsQuery();
  const selectedCategories = useSelector(getArticleFilterSelectedCategories);
  const searchText = useSelector(getArticleFilterSearchText);
  const selectedTags = useSelector(getArticleFilterSelectedTags);
  const baseFilterValue = useSelector(getArticleFilterSort);

  useEffect(() => {
    if (categories?.length === 0 || tags?.length === 0) return;
    dispatch(articlesFiltersActions.setFiltersReady(true));
  }, [dispatch, categories?.length, tags?.length]);

  const filterCategories = useMemo(() => {
    if (categories && categories?.length > 0) {
      return categories?.map((category) => ({ label: category.name, value: category.id }));
    }
    return [];
  }, [categories]);

  const filterTags = useMemo(() => {
    if (tags && tags.length > 0) {
      return tags.map((tag) => ({ label: tag.name, value: tag.id }));
    }
    return [];
  }, [tags]);

  const filterBase = useMemo(() => {
    return [
      { label: t('recent'), value: 'desc_date' },
      { label: t('old'), value: 'asc_date' },
      { label: t('popular'), value: 'most_popular' },
    ];
  }, [t]);

  const debouncedSearchFunc = useCallback((val: string) => {
    if (val) {
      dispatch(articlesFiltersActions.setFilter({ search: val }));
    } else {
      dispatch(articlesFiltersActions.removeFilter('search'));
    }
  }, [dispatch]);

  const debouncedSearch = useDebounce(debouncedSearchFunc, 500);

  const onChangeSearchText = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch(articlesFiltersActions.setSearch(e.currentTarget.value));
    debouncedSearch(e.currentTarget.value);
  }, [dispatch, debouncedSearch]);

  const onChageCategories = useCallback((val: string[]) => {
    dispatch(articlesFiltersActions.setCategories(val));
    if (val.length > 0) {
      dispatch(articlesFiltersActions.setFilter({ categoryIds: val.join(',') }));
    } else {
      dispatch(articlesFiltersActions.removeFilter('categoryIds'));
    }
  }, [dispatch]);

  const onChageTags = useCallback((val: string[]) => {
    dispatch(articlesFiltersActions.setTags(val));
    if (val.length > 0) {
      dispatch(articlesFiltersActions.setFilter({ tagIds: val.join(',') }));
    } else {
      dispatch(articlesFiltersActions.removeFilter('tagIds'));
    }
  }, [dispatch]);

  const onChageBase = useCallback((val: 'asc_date' | 'desc_date' | 'most_popular') => {
    let sortBy = 'date';
    let sort = 'desc';
    switch (val) {
      case ('asc_date'):
        sortBy = 'date';
        sort = 'asc';
        break;
      case ('desc_date'):
        sortBy = 'date';
        sort = 'desc';
        break;
      case ('most_popular'):
        sortBy = 'views';
        sort = 'desc';
        break;
      default:
        sortBy = 'date';
        sort = 'desc';
    }
    dispatch(articlesFiltersActions.setSort(val));
    dispatch(articlesFiltersActions.setFilter({ sortBy, sort }));
  }, [dispatch]);

  return (
    <div className={cls.articleFilters}>
      <Input
        value={searchText}
        onChange={onChangeSearchText}
        className={cls.articleFiltersSearch}
        placeholder={t('search_placeholder')}
        label={t('search_label')}
      />
      <div className={cls.articleFiltersSelectWrapper}>
        <Select
          multiple
          value={selectedCategories}
          onChange={(val) => onChageCategories(val as string[])}
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
        <Select
          value={baseFilterValue}
          onChange={(val) => onChageBase(val as 'asc_date' | 'desc_date' | 'most_popular')}
          options={filterBase}
          label={t('sort_by_label')}
          placeholder={t('select_placeholder')}
          className={cls.articleFilterSelect}
        />
      </div>
    </div>
  );
});
