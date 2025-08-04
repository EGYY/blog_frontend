import { ComponentStory, ComponentMeta } from '@storybook/react';
import withMock from 'storybook-addon-mock';

import ArticlesPage from '../ArticlesPage';

import { testCategories, testTags } from '@/shared/lib/tests/const/testContstants';

export default {
  title: 'pages/ArticlesPage',
  component: ArticlesPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
  decorators: [withMock],
  parameters: {
    mockData: [
      {
        url: `${__SERVER_URL__}/article-categories`,
        method: 'GET',
        status: 200,
        response: testCategories,
      },
      {
        url: `${__SERVER_URL__}/article-tags`,
        method: 'GET',
        status: 200,
        response: testTags,
      },
    ],
  },
} as ComponentMeta<typeof ArticlesPage>;

const Template: ComponentStory<typeof ArticlesPage> = () => <ArticlesPage />;

export const Default = Template.bind({});
Default.args = {};
