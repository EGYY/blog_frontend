import {
  memo, useCallback, useEffect, useMemo,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getErrorProfileDetail } from '../model/selectors/getErrorProfileDetail/getErrorProfileDetail';
import { getLoadingProfileDetail } from '../model/selectors/getLoadingProfileDetail/getLoadingProfileDetail';
import { getProfileDetail } from '../model/selectors/getProfileDetail/getProfileDetail';
import { getProfileById } from '../model/services/getProfileById';
import { profileDetailReducer } from '../model/slice/profileDetailSlice';

import { ProfileLastArticles, ProfileMainInfo, ProfileStatList } from '@/entities/Profile';
import { getUser } from '@/entities/User';
import PenIcon from '@/shared/assets/square-pen.svg';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button } from '@/shared/ui/Button/Button';
import { Card } from '@/shared/ui/Card/Card';

import cls from './ProfileViewer.module.scss';

const initialReducers: ReducersList = {
  profile_detail: profileDetailReducer,
};

interface ProfileViewerProps {
  id?: string
}

export const ProfileViewer = memo((props: ProfileViewerProps) => {
  const { id } = props;
  const { t } = useTranslation('profile');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useSelector(getUser);
  const profile = useSelector(getProfileDetail);
  const loading = useSelector(getLoadingProfileDetail);
  const error = useSelector(getErrorProfileDetail);

  useEffect(() => {
    if (id) {
      dispatch(getProfileById(id));
    }
  }, [id, dispatch]);

  const handleGoEditProfile = useCallback(() => {
    navigate('/profile/edit');
  }, [navigate]);

  const isAuthUserProfile = useMemo(() => {
    if (user) {
      const condition = user.id === id;
      return condition;
    }
    return false;
  }, [id, user]);

  const canSubscribe = useMemo(() => {
    if (!user?.id || isAuthUserProfile) {
      return false;
    }
    return true;
  }, [user, isAuthUserProfile]);

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <div className={cls.profileDetailPageWrapper}>
        <div className={cls.profileDetailPageHeader}>
          <h1>{t('profile')}</h1>
          {isAuthUserProfile && (
            <div className={cls.profileActions}>
              <Button theme="outline" onClick={handleGoEditProfile}>
                <PenIcon width={20} />
                {t('edit')}
              </Button>
            </div>
          )}
        </div>
        <div className={cls.profileDetailPageContent}>
          <Card>
            <ProfileMainInfo canSubscribe={canSubscribe} profile={profile} />
          </Card>
          <div>
            <ProfileStatList profile={profile} />
            {profile?.articles && profile?.articles.length > 0 && (
              <ProfileLastArticles profile={profile} />
            )}
          </div>
        </div>
      </div>
    </DynamicModuleLoader>
  );
});
