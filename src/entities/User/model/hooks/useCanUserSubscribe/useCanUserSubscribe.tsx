import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { getUser } from '../../selectors/getUser/getUser';

export function useCanUserSubscribe(id?: string) {
  const user = useSelector(getUser);
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

  return {
    canSubscribe,
    isAuthUserProfile,
  };
}
