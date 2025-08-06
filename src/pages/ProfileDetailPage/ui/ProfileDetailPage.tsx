import { useParams } from 'react-router-dom';

import { PageWrapper } from '@/widgets/PageWrapper';
import { ProfileViewer } from '@/widgets/ProfileViewer';

const ProfileDetailPage = () => {
    const { id } = useParams();

    return (
        <PageWrapper>
            <ProfileViewer id={id} />
        </PageWrapper>
    );
};

export default ProfileDetailPage;
