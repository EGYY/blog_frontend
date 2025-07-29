import { getLoadingUser } from './getLoadingUser';

import { StateSchema } from '@/app/providers/StoreProvider';

describe('getLoading', () => {
  test('should return loading value', () => {
    const state: DeepPartial<StateSchema> = {
      user: {
        userData: undefined,
        loading: false,
      },
    };
    expect(getLoadingUser(state as StateSchema)).toEqual(false);
  });
});
