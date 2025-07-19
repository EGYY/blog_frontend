import { useParams } from 'react-router-dom';

import { ProfileViewer } from '@/widgets/ProfileViewer';
import { PageWrapper } from '@/widgets/PageWrapper/PageWrapper';

const ProfileDetailPage = () => {
  const { id } = useParams();

  return (
    <PageWrapper>
      <ProfileViewer id={id} />
    </PageWrapper>
  );
};

export default ProfileDetailPage;
