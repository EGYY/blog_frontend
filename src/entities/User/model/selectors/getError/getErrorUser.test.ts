import { StateSchema } from '@/app/providers/StoreProvider';
import { getErrorUser } from './getErrorUser';

describe('getError', () => {
  test('should return err value', () => {
    const state: DeepPartial<StateSchema> = {
      user: {
        userData: undefined,
        loading: false,
        error: 'Some error',
      },
    };
    expect(getErrorUser(state as StateSchema)).toEqual('Some error');
  });
});
