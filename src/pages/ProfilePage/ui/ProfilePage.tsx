import { useSelector } from 'react-redux';

import {
  getErrorUser,
  getLoadingUser,
  getProfileData, getUser,
} from '@/entities/User';
import {
  EditableProfileCard, getErrorUpdateProfile, getLoadingUpdateProfile, updateProfileReducer,
} from '@/features/EditableProfileCard';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppEffect } from '@/shared/lib/hooks/useAppEffect/useAppEffect';
import { PageWrapper } from '@/widgets/PageWrapper';

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

  useAppEffect(() => {
    if (!user && !loading && !error) {
      dispatch(getProfileData());
    }
  }, [dispatch, error, loading, user]);

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <PageWrapper data-testid="profile-page">
        <EditableProfileCard user={user} loading={loadingUpdateProfile} error={errorUpdateProfile} />
      </PageWrapper>
    </DynamicModuleLoader>
  );
};

export default ProfilePage;
