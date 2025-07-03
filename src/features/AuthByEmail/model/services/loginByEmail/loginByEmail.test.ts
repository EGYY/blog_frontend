import Cookies from 'js-cookie';
import { testUserData } from '@/entities/User/model/const/userConsts';
import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk';
import { loginByEmail } from './loginByEmail';
import { userActions } from '@/entities/User';

jest.mock('js-cookie');

const CookiesTest = jest.mocked(Cookies, true);

describe('loginByEmail.test.ts', () => {
  beforeEach(() => {
    jest.resetAllMocks(); // Полный сброс моков
  });
  test('success login', async () => {
    const thunk = new TestAsyncThunk(loginByEmail);
    thunk.api.post.mockResolvedValue({ data: testUserData });
    const credentials = { email: 'test@example.ru', password: '123456qs' };
    const result = await thunk.callThunk(credentials);

    expect(thunk.api.post).toHaveBeenCalledWith('/auth/login', credentials);
    expect(CookiesTest.set).toHaveBeenCalledWith('accessToken', testUserData.accessToken, {
      domain: 'localhost',
      sameSite: 'strict',
      expires: 1,
    });
    expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(testUserData));
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
