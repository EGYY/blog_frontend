import {
  memo, useCallback, useMemo, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getLoadingProfileArticles } from '../model/selectors/getLoadingProfileArticles/getLoadingProfileArticles';
import { getPageProfileArticles } from '../model/selectors/getPageProfileArticles/getPageProfileArticles';
import { getProfileArticlesSelector } from '../model/selectors/getProfileArticlesSelector/getProfileArticlesSelector';
import { getTotalProfileArticles } from '../model/selectors/getTotalProfileArticles/getTotalProfileArticles';
import { deleteProfileArticle } from '../model/services/deleteProfileArticle/deleteProfileArticle';
import { getProfileArticles } from '../model/services/getProfileArticles/getProfileArticles';
import { updateProfileData } from '../model/services/updateProfileData/updateProfileData';
import { updateProfileActions } from '../model/slice/updateProfileSlice';

import { ProfileArticles } from '@/entities/Profile';
import { User } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppEffect } from '@/shared/lib/hooks/useAppEffect/useAppEffect';
import { AvatarUpload } from '@/shared/ui/Avatar/AvatarUpload';
import { Button } from '@/shared/ui/Button/Button';
import { Card } from '@/shared/ui/Card/Card';
import { Input } from '@/shared/ui/Input/Input';
import Pagination from '@/shared/ui/Pagination/Pagination';
import Tabs, { Tab } from '@/shared/ui/Tabs/Tabs';
import { Textarea } from '@/shared/ui/Textarea/Textarea';
import { Tooltip } from '@/shared/ui/Tooltip/Tooltip';

import styles from './EditableProfileCard.module.scss';

interface EditableProfileCardProps {
    user?: User,
    loading?: boolean,
    error?: string,
}

export const EditableProfileCard = memo((props: EditableProfileCardProps) => {
  const { t } = useTranslation('profile');
  const dispatch = useAppDispatch();
  const { user, loading = false, error } = props;

  const articles = useSelector(getProfileArticlesSelector);
  const loadingArticles = useSelector(getLoadingProfileArticles);
  const pageArticles = useSelector(getPageProfileArticles);
  const totalArticles = useSelector(getTotalProfileArticles);

  const [userName, setUserName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [avatar, setAvatar] = useState<File | undefined>();

  useAppEffect(() => {
    dispatch(getProfileArticles());
  }, [dispatch, pageArticles]);

  const handleChangeUserName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.currentTarget.value);
  }, []);

  const handleChangeEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  }, []);

  const handleSubmitForm = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (avatar) {
      formData.append('avatar', avatar);
    }
    dispatch(updateProfileData(formData));
  }, [avatar, dispatch]);

  const handleChangePage = useCallback((page: number) => {
    dispatch(updateProfileActions.setPageArticles(page));
  }, [dispatch]);

  const onDeleteArticle = useCallback((id: string) => {
    dispatch(deleteProfileArticle(id));
  }, [dispatch]);

  const tabs: Tab[] = useMemo(() => ([
    {
      id: 'main_info',
      title: t('profile_details'),
      content: (
        <Card className={styles.profileDetailsCardEdit}>
          <b>{t('profile_details')}</b>
          <form onSubmit={handleSubmitForm}>
            <div className={styles.profileCardFormInputs}>
              <Input
                value={userName}
                onChange={handleChangeUserName}
                label={t('form_name')}
                name="name"
                className={styles.profileCardFormEl}
              />
              <Input
                value={email}
                onChange={handleChangeEmail}
                label={t('form_email')}
                name="email"
                type="email"
                className={styles.profileCardFormEl}
              />
              <Textarea
                className={styles.fullWidthFormEl}
                label={t('form_bio')}
                name="bio"
                defaultValue={user?.bio}
              />
            </div>
            {error && <p style={{ color: '#e7000b' }}>{error}</p>}
            <div className={styles.profileCardFormSubmit}>
              <Button
                loading={loading}
                disabled={!email || !userName || loading}
                type="submit"
              >
                {t('form_submit')}
              </Button>
            </div>
          </form>
        </Card>
      ),
    },
    {
      id: 'articles',
      title: t('list_articles'),
      content: (
        <>
          <ProfileArticles
            loading={loadingArticles}
            articles={articles}
            title={t('list_articles')}
            type="withActions"
            onDeleteArticle={onDeleteArticle}
          />
          {totalArticles > 0 && (
          <Pagination
            currentPage={pageArticles}
            totalPages={Math.ceil(totalArticles / 10)}
            onPageChange={handleChangePage}
            className={styles.articlesPagination}
          />
          )}
        </>
      ),
    },
  ]), [
    articles,
    email,
    error,
    loadingArticles,
    pageArticles,
    onDeleteArticle,
    handleChangePage,
    handleChangeEmail,
    handleChangeUserName,
    handleSubmitForm,
    loading,
    t,
    user?.bio,
    userName,
    totalArticles,
  ]);

  return (
    <div className={styles.profileCardContainer}>
      <div className={styles.profileCardInfo}>
        <Tooltip content={t('upload_avatar')} preferredPlacement="bottom">
          <AvatarUpload
            src={`${__SERVER_URL__}${user?.avatar}`}
            alt={user?.name || user?.email}
            onChangeImage={setAvatar}
          />
        </Tooltip>
        <div className={styles.profileCardInfoText}>
          <b>{user?.name}</b>
          <span>{user?.email}</span>
        </div>
      </div>
      <Tabs tabs={tabs} />
    </div>
  );
});
