import { getProfileData } from '../services/getProfileData';
import { UserSchema } from '../types/user';

import { userReducer, userActions } from './userSlice';

import { testUserAfterAuth } from '@/shared/lib/tests/const/testContstants';

describe('userSlice', () => {
    const initialState: UserSchema = {
        userData: undefined,
        loading: false,
        error: undefined,
        inited: false,
    };

    it('setAuthData', () => {
        const nextState = userReducer(
            initialState,
            userActions.setAuthData(testUserAfterAuth),
        );
        expect(nextState.userData).toEqual(testUserAfterAuth);
    });

    it('logout', () => {
        const stateWithUser: UserSchema = {
            userData: testUserAfterAuth,
            loading: false,
            error: undefined,
            inited: true,
        };
        const nextState = userReducer(stateWithUser, userActions.logout());
        expect(nextState.userData).toBeUndefined();
    });

    it('getProfileData.pending', () => {
        const action = {
            type: getProfileData.pending.type,
        };

        const nextState = userReducer(initialState, action);
        expect(nextState.loading).toBe(true);
        expect(nextState.error).toBe(undefined);
    });

    it('getProfileData.fulfilled', () => {
        const action = {
            type: getProfileData.fulfilled.type,
            payload: testUserAfterAuth.user,
        };

        const nextState = userReducer(initialState, action);
        expect(nextState).toEqual({
            userData: { user: testUserAfterAuth.user },
            loading: false,
            error: undefined,
            inited: true,
        });
    });

    it('getProfileData.rejected', () => {
        const stateWithUser: UserSchema = {
            userData: testUserAfterAuth,
            loading: false,
            inited: true,
        };

        const action = {
            type: getProfileData.rejected.type,
            payload: 'Some error',
        };
        const nextState = userReducer(stateWithUser, action);
        expect(nextState.userData).toBeUndefined();
        expect(nextState.error).toEqual('Some error');
    });
});
