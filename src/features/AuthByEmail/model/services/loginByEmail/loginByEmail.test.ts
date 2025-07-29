import Cookies from 'js-cookie';

import { loginByEmail } from './loginByEmail';

import { userActions } from '@/entities/User';
import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk';
import { testUserAfterAuth } from '@/shared/lib/tests/const/testContstants';

jest.mock('js-cookie');

const CookiesTest = jest.mocked(Cookies, true);

describe('loginByEmail.test.ts', () => {
  beforeEach(() => {
    jest.resetAllMocks(); // Полный сброс моков
  });
  test('success login', async () => {
    const thunk = new TestAsyncThunk(loginByEmail);
    thunk.api.post.mockResolvedValue({ data: testUserAfterAuth });
    const credentials = { email: 'test@example.ru', password: '123456qs' };
    const result = await thunk.callThunk(credentials);

    expect(thunk.api.post).toHaveBeenCalledWith('/auth/login', credentials);
    expect(CookiesTest.set).toHaveBeenCalledWith('accessToken', testUserAfterAuth.accessToken, {
      domain: 'localhost',
      sameSite: 'strict',
      expires: 1,
    });
    expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(testUserAfterAuth));
    expect(result.meta.requestStatus).toBe('fulfilled');
  });

  test('error login', async () => {
    const errorMessage = 'Некорректный ответ сервера';
    const thunk = new TestAsyncThunk(loginByEmail);
    thunk.api.post.mockResolvedValue(errorMessage);
    const credentials = { email: 'test@example.ru', password: 'wrongpassword' };
    const result = await thunk.callThunk(credentials);
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe(errorMessage);
  });
});
