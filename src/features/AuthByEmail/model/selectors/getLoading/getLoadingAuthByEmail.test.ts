import { StateSchema } from '@/app/providers/StoreProvider';
import { getLoadingAuthByEmail } from './getLoadingAuthByEmail';

describe('AuthByEmail selector', () => {
  test('get loading', () => {
    const state: DeepPartial<StateSchema> = {
      login: { loading: true },
    };
    expect(getLoadingAuthByEmail(state as StateSchema)).toEqual(true);
  });

  test('get loading if state empty', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getLoadingAuthByEmail(state as StateSchema)).toEqual(undefined);
  });
});
