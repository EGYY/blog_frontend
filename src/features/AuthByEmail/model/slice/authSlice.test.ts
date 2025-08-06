import { loginByEmail } from '../services/loginByEmail/loginByEmail';
import { AuthSchema } from '../types/AuthSchema';

import { authActions, authReducer } from './authSlice';

describe('loginSlice', () => {
    const initialState: AuthSchema = {
        loading: false,
        typeForm: 'auth',
        error: undefined,
    };

    it('setLoading', () => {
        const nextState = authReducer(
            initialState,
            authActions.setLoading(true),
        );
        expect(nextState).toEqual({
            loading: true,
            error: undefined,
            typeForm: 'auth',
        });
    });

    it('setError', () => {
        const nextState = authReducer(
            initialState,
            authActions.setError('Ошибка'),
        );
        expect(nextState).toEqual({
            loading: false,
            error: 'Ошибка',
            typeForm: 'auth',
        });
    });

    it('setError(null)', () => {
        const nextState = authReducer(
            { loading: false, error: 'Some error', typeForm: 'auth' },
            authActions.setError(undefined),
        );
        expect(nextState).toEqual({
            loading: false,
            error: undefined,
            typeForm: 'auth',
        });
    });

    it('loginByEmail.pending', () => {
        const action = { type: loginByEmail.pending.type };
        const state = authReducer(
            { loading: false, error: 'Some error', typeForm: 'auth' },
            action,
        );
        expect(state).toEqual({
            loading: true,
            error: undefined,
            typeForm: 'auth',
        });
    });

    it('loginByEmail.fulfilled', () => {
        const action = { type: loginByEmail.fulfilled.type };
        const state = authReducer(
            { loading: true, error: undefined, typeForm: 'auth' },
            action,
        );
        expect(state).toEqual({
            loading: false,
            error: undefined,
            typeForm: 'auth',
        });
    });

    it('loginByEmail.rejected with payload', () => {
        const action = {
            type: loginByEmail.rejected.type,
            payload: 'Неверный email или пароль',
        };
        const state = authReducer(
            { loading: true, error: undefined, typeForm: 'auth' },
            action,
        );
        expect(state).toEqual({
            loading: false,
            error: 'Неверный email или пароль',
            typeForm: 'auth',
        });
    });

    it('loginByEmail.rejected without payload', () => {
        const action = {
            type: loginByEmail.rejected.type,
        };
        const state = authReducer(
            { loading: true, error: undefined, typeForm: 'auth' },
            action as any,
        );
        expect(state).toEqual({
            loading: false,
            error: undefined,
            typeForm: 'auth',
        });
    });
});
