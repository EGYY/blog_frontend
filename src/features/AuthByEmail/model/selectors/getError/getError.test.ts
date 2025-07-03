import { StateSchema } from '@/app/providers/StoreProvider';
import { getError } from './getError';

describe('AuthByEmail selector', () => {
  test('get error', () => {
    const state: DeepPartial<StateSchema> = {
      login: { error: 'Some error' },
    };
    expect(getError(state as StateSchema)).toEqual('Some error');
  });

  test('get error if state empty', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getError(state as StateSchema)).toEqual(undefined);
  });
});
