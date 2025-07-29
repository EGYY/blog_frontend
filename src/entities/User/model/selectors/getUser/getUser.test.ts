import { getUser } from './getUser';

import { StateSchema } from '@/app/providers/StoreProvider';
import { testUserAfterAuth } from '@/shared/lib/tests/const/testContstants';

describe('getUser', () => {
  test('should return user value', () => {
    const state: DeepPartial<StateSchema> = {
      user: {
        userData: testUserAfterAuth,
      },
    };
    expect(getUser(state as StateSchema)).toEqual(testUserAfterAuth.user);
  });
});
