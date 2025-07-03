import { userReducer, userActions } from './userSlice';
import { getProfileData } from '../services/getProfileData';
import { UserSchema } from '../types/user';
import { testUserData } from '../const/userConsts';

describe('userSlice', () => {
  const initialState: UserSchema = {
    userData: undefined,
  };

  it('setAuthData', () => {
    const nextState = userReducer(initialState, userActions.setAuthData(testUserData));
    expect(nextState.userData).toEqual(testUserData);
  });

  it('logout', () => {
    const stateWithUser: UserSchema = {
      userData: testUserData,
    };
    const nextState = userReducer(stateWithUser, userActions.logout());
    expect(nextState.userData).toBeUndefined();
  });

  it('getProfileData.fulfilled', () => {
    const action = {
      type: getProfileData.fulfilled.type,
      payload: testUserData.user,
    };

    const nextState = userReducer(initialState, action);
    expect(nextState.userData).toEqual({
      user: testUserData.user,
    });
  });

  it('getProfileData.rejected', () => {
    const stateWithUser: UserSchema = {
      userData: testUserData,
    };

    const action = { type: getProfileData.rejected.type };
    const nextState = userReducer(stateWithUser, action);
    expect(nextState.userData).toBeUndefined();
  });
});
