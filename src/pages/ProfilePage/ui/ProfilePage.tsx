import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  getErrorUser,
  getLoadingUser,
  getProfileData, getUser,
} from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
  EditableProfileCard, getErrorUpdateProfile, getLoadingUpdateProfile, updateProfileReducer,
} from '@/features/EditableProfileCard';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { PageWrapper } from '@/widgets/PageWrapper/PageWrapper';

const initialReducers: ReducersList = {
  update_profile: updateProfileReducer,
};

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const user = useSelector(getUser);
  const error = useSelector(getErrorUser);
  const loading = useSelector(getLoadingUser);
  const loadingUpdateProfile = useSelector(getLoadingUpdateProfile);
  const errorUpdateProfile = useSelector(getErrorUpdateProfile);

  useEffect(() => {
    if (!user && !loading && !error) {
      dispatch(getProfileData());
    }
  }, [dispatch, error, loading, user]);

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <PageWrapper>
        <EditableProfileCard user={user} loading={loadingUpdateProfile} error={errorUpdateProfile} />
      </PageWrapper>
    </DynamicModuleLoader>
  );
};

export default ProfilePage;
