import { getLoadingAuthByEmail } from './getLoadingAuthByEmail';

import { StateSchema } from '@/app/providers/StoreProvider';

describe('AuthByEmail selector', () => {
  test('get loading', () => {
    const state: DeepPartial<StateSchema> = {
      auth: { loading: true },
    };
    expect(getLoadingAuthByEmail(state as StateSchema)).toEqual(true);
  });

  test('get loading if state empty', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getLoadingAuthByEmail(state as StateSchema)).toEqual(false);
  });
});
