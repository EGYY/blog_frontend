import Cookies from 'js-cookie';
import { testUserData } from '@/entities/User/model/const/userConsts';
import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk';
import { loginByEmail } from './loginByEmail';
import { userActions } from '@/entities/User';
import { axiosClassic } from '@/shared/config/api/api';

jest.mock('@/shared/config/api/api', () => ({
  axiosClassic: {
    post: jest.fn(),
  },
}));

jest.mock('js-cookie');

const axiosClassicTest = jest.mocked(axiosClassic, true);
const CookiesTest = jest.mocked(Cookies, true);

describe('loginByEmail.test.ts', () => {
  test('success login', async () => {
    axiosClassicTest.post.mockResolvedValue({ data: testUserData });
    const thunk = new TestAsyncThunk(loginByEmail);
    const credentials = { email: 'test@example.ru', password: '123456qs' };
    const result = await thunk.callThunk(credentials);
    expect(axiosClassic.post).toHaveBeenCalledWith('/auth/login', credentials);
    expect(CookiesTest.set).toHaveBeenCalledWith('accessToken', testUserData.accessToken, {
      domain: 'localhost',
      sameSite: 'strict',
      expires: 1,
    });
    expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(testUserData));
    expect(result.meta.requestStatus).toBe('fulfilled');
  });
});
