import { StateSchema } from '@/app/providers/StoreProvider';
import { getLoadingUser } from './getLoadingUser';

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
