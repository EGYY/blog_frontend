import { useParams } from 'react-router-dom';

import { ProfileViewer } from '@/widgets/ProfileViewer';

const ProfileDetailPage = () => {
  const { id } = useParams();

  return <ProfileViewer id={id} />;
};

export default ProfileDetailPage;
