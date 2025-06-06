import { useEffect, useState } from 'react';
import { Button } from '@/shared/ui/Button/Button';

export const BugButton = () => {
  const [err, setErr] = useState(false);

  useEffect(() => {
    if (err) {
      throw new Error();
    }
  }, [err]);

  return (
    // eslint-disable-next-line i18next/no-literal-string
    <Button loading onClick={() => setErr(true)}>BugButton</Button>
  );
};
