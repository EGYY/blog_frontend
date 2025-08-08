import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { PageError } from '@/widgets/PageError';
import { PageWrapper } from '@/widgets/PageWrapper';

function Forbidden() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    return (
        <PageWrapper>
            <PageError
                errorTitle={t('access_denied')}
                errorDescription={t('access_denied_description')}
                actionText={t('access_denied_action_text')}
                actionHandler={() => navigate(-1)}
            />
        </PageWrapper>
    );
}

export default Forbidden;
