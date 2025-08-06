import { getAccessToken } from './getAccessToken';

import { StateSchema } from '@/app/providers/StoreProvider';
import { testUserAfterAuth } from '@/shared/lib/tests/const/testContstants';

describe('getAccessToken', () => {
    test('should return accessToken value', () => {
        const state: DeepPartial<StateSchema> = {
            user: {
                userData: testUserAfterAuth,
            },
        };
        expect(getAccessToken(state as StateSchema)).toEqual(
            testUserAfterAuth.accessToken,
        );
    });
});
