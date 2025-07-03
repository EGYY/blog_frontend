import { loginByEmail } from '../services/loginByEmail/loginByEmail';
import { loginActions, loginReducer } from './loginSlice';
import { LoginSchema } from '../types/LoginSchema';

describe('loginSlice', () => {
  const initialState: LoginSchema = {
    loading: false,
    error: undefined,
  };

  it('setLoading', () => {
    const nextState = loginReducer(initialState, loginActions.setLoading(true));
    expect(nextState).toEqual({ loading: true, error: undefined });
  });

  it('setError', () => {
    const nextState = loginReducer(initialState, loginActions.setError('Ошибка'));
    expect(nextState).toEqual({ loading: false, error: 'Ошибка' });
  });

  it('setError(null)', () => {
    const nextState = loginReducer({ loading: false, error: 'Some error' }, loginActions.setError(undefined));
    expect(nextState).toEqual({ loading: false, error: undefined });
  });

  it('loginByEmail.pending', () => {
    const action = { type: loginByEmail.pending.type };
    const state = loginReducer({ loading: false, error: 'Some error' }, action);
    expect(state).toEqual({ loading: true, error: undefined });
  });

  it('loginByEmail.fulfilled', () => {
    const action = { type: loginByEmail.fulfilled.type };
    const state = loginReducer({ loading: true, error: undefined }, action);
    expect(state).toEqual({ loading: false, error: undefined });
  });

  it('loginByEmail.rejected with payload', () => {
    const action = {
      type: loginByEmail.rejected.type,
      payload: 'Неверный email или пароль',
    };
    const state = loginReducer({ loading: true, error: undefined }, action);
    expect(state).toEqual({ loading: false, error: 'Неверный email или пароль' });
  });

  it('loginByEmail.rejected without payload', () => {
    const action = {
      type: loginByEmail.rejected.type,
    };
    const state = loginReducer({ loading: true, error: undefined }, action as any);
    expect(state).toEqual({ loading: false, error: undefined });
  });
});
