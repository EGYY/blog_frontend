/* eslint-disable egyy-plugin/layer-imports */
import { ArticleType, TagType, Category } from '@/entities/Article';
import { Comment } from '@/entities/Comment';
import { Notification } from '@/entities/Notification';
import { Profile } from '@/entities/Profile';
import { User } from '@/entities/User';

type UserAfterAuthType = { user: User, accessToken: string };

export const testUser: User = {
  id: '1',
  createdAt: '2025-07-01T09:41:40.293Z',
  updatedAt: '2025-07-01T09:41:40.293Z',
  email: 'test@example.ru',
  name: 'Test',
  avatar: 'https://placehold.co/150',
  bio: '',
  role: 'USER',
};

export const testUserAfterAuth: UserAfterAuthType = {
  user: testUser,
  accessToken: 'testToken',
};

export const testArticle: ArticleType = {
  id: '1',
  createdAt: '2025-07-24T08:03:32.978Z',
  updatedAt: '2025-07-28T14:04:21.237Z',
  title: 'Заголовок',
  subtitle: 'Подзаголовок',
  content: '<h3>Привет я статья</h3>',
  poster: 'https://placehold.co/400',
  published: true,
  likesCount: 0,
  viewsCount: 14,
  authorId: '1',
  categoryId: '1',
  author: testUser,
  comments: [],
  likes: [],
  category: {
    id: '1',
    name: 'Frontend',
  },
  tags: [
    {
      id: '1',
      name: 'React',
    },
    {
      id: '2',
      name: 'TypeScript',
    },
    {
      id: '3',
      name: 'Next.js',
    },
  ],
};

export const testProfile: Profile = {
  id: '1',
  createdAt: '2025-07-23T10:44:59.620Z',
  updatedAt: '2025-07-23T10:50:22.863Z',
  email: 'test@test.ru',
  name: 'Test',
  bio: 'Frontend',
  avatar: 'https://placehold.co/150',
  role: 'USER',
  _count: {
    articles: 2,
    comments: 0,
    likes: 0,
    followers: 1,
    following: 0,
  },
  articles: ['1', '2', '3', '4', '5'].map((id) => ({ ...testArticle, id })),
};

export const testNotification: Notification = {
  id: '1',
  createdAt: '2025-07-25T14:39:17.046Z',
  message: 'Новая статья "Тестовая статья"',
  viewed: false,
  article: testArticle,
  user: testUser,
};

export const testComments: Comment[] = [
  {
    id: '1',
    content: 'Test comment',
    authorId: '1',
    articleId: '1',
    author: testUser,
    createdAt: '2025-07-24T08:03:32.978Z',
    updatedAt: '2025-07-24T08:03:32.978Z',
  },
  {
    id: '2',
    content: 'Test comment 2',
    authorId: '1',
    articleId: '1',
    author: testUser,
    createdAt: '2025-07-24T08:03:32.978Z',
    updatedAt: '2025-07-24T08:03:32.978Z',
  },
  {
    id: '3',
    content: 'Test comment 3',
    authorId: '1',
    articleId: '1',
    author: testUser,
    createdAt: '2025-07-24T08:03:32.978Z',
    updatedAt: '2025-07-24T08:03:32.978Z',
  },
];

export const testCategories: Category[] = [
  {
    id: '1',
    name: 'Frontend',
  },
  {
    id: '2',
    name: 'Backend',
  },
  {
    id: '3',
    name: 'DevOps',
  },
  {
    id: '4',
    name: 'AI',
  },
  {
    id: '5',
    name: 'Design',
  },
];

export const testTags: TagType[] = [
  {
    id: '1',
    name: 'React',
  },
  {
    id: '2',
    name: 'Node.js',
  },
  {
    id: '3',
    name: 'TypeScript',
  },
  {
    id: '4',
    name: 'Docker',
  },
  {
    id: '5',
    name: 'Figma',
  },
  {
    id: '6',
    name: 'Next.js',
  },
  {
    id: '7',
    name: 'PostgreSQL',
  },
];
