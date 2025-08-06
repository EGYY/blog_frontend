import { getErrorUser } from './getErrorUser';

import { StateSchema } from '@/app/providers/StoreProvider';

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
