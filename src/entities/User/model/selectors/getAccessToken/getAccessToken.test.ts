import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import { getAccessToken } from './getAccessToken';
import { testToken, testUserData } from '../../const/userConsts';

describe('getAccessToken', () => {
  test('should return accessToken value', () => {
    const state: DeepPartial<StateSchema> = {
      user: {
        userData: testUserData,
      },
    };
    expect(getAccessToken(state as StateSchema)).toEqual(testToken);
  });
});
