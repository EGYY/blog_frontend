import { StateSchema } from '@/app/providers/StoreProvider';
import { getUser } from './getUser';
import { testUserData } from '../../const/userConsts';

describe('getUser', () => {
  test('should return user value', () => {
    const state: DeepPartial<StateSchema> = {
      user: {
        userData: testUserData,
      },
    };
    expect(getUser(state as StateSchema)).toEqual(testUserData.user);
  });
});
