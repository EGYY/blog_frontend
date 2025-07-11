import { userReducer, userActions } from './userSlice';
import { getProfileData } from '../services/getProfileData';
import { UserSchema } from '../types/user';
import { testUserData } from '../const/userConsts';

describe('userSlice', () => {
  const initialState: UserSchema = {
    userData: undefined,
    loading: false,
    error: undefined,
    inited: false,
  };

  it('setAuthData', () => {
    const nextState = userReducer(initialState, userActions.setAuthData(testUserData));
    expect(nextState.userData).toEqual(testUserData);
  });

  it('logout', () => {
    const stateWithUser: UserSchema = {
      userData: testUserData,
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
      payload: testUserData.user,
    };

    const nextState = userReducer(initialState, action);
    expect(nextState).toEqual({
      userData: { user: testUserData.user },
      loading: false,
      error: undefined,
      inited: true,
    });
  });

  it('getProfileData.rejected', () => {
    const stateWithUser: UserSchema = {
      userData: testUserData,
      loading: false,
      inited: true,
    };

    const action = { type: getProfileData.rejected.type, payload: 'Some error' };
    const nextState = userReducer(stateWithUser, action);
    expect(nextState.userData).toBeUndefined();
    expect(nextState.error).toEqual('Some error');
  });
});
