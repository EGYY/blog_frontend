import { User, UserRole } from '../types/user';

export const testToken = 'testToken';

export const testUserData: {user: User, accessToken: string} = {
  user: {
    id: 'testid',
    createdAt: '2025-07-01T09:41:40.293Z',
    updatedAt: '2025-07-01T09:41:40.293Z',
    email: 'test@example.ru',
    name: 'Test',
    avatar: '/uploads/no-user-image.png',
    bio: '',
    role: UserRole.USER,
  },
  accessToken: testToken,
};
