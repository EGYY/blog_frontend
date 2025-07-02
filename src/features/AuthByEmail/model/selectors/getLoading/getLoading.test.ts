import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import { getLoading } from './getLoading';

describe('AuthByEmail selector', () => {
  test('get loading', () => {
    const state: DeepPartial<StateSchema> = {
      login: { loading: true },
    };
    expect(getLoading(state as StateSchema)).toEqual(true);
  });

  test('get loading if state empty', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getLoading(state as StateSchema)).toEqual(undefined);
  });
});
