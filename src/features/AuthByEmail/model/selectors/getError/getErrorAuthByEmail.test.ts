import { StateSchema } from '@/app/providers/StoreProvider';
import { getErrorAuthByEmail } from './getErrorAuthByEmail';

describe('AuthByEmail selector', () => {
  test('get error', () => {
    const state: DeepPartial<StateSchema> = {
      login: { error: 'Some error' },
    };
    expect(getErrorAuthByEmail(state as StateSchema)).toEqual('Some error');
  });

  test('get error if state empty', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getErrorAuthByEmail(state as StateSchema)).toEqual(undefined);
  });
});
