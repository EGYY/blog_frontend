import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { User } from '@/entities/User';
import styles from './EditableProfileCard.module.scss';
import { Card } from '@/shared/ui/Card/Card';
import { Input } from '@/shared/ui/Input/Input';
import { Button } from '@/shared/ui/Button/Button';
import { AvatarUpload } from '@/shared/ui/Avatar/AvatarUpload';
import { Textarea } from '@/shared/ui/Textarea/Textarea';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { Tooltip } from '@/shared/ui/Tooltip/Tooltip';

interface EditableProfileCardProps {
    user?: User,
    loading?: boolean,
    error?: string,
}

export const EditableProfileCard = memo((props: EditableProfileCardProps) => {
  const { t } = useTranslation('profile');
  const dispatch = useAppDispatch();
  const { user, loading, error } = props;

  const [userName, setUserName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [avatar, setAvatar] = useState<File | undefined>();

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
    </div>
  );
});
