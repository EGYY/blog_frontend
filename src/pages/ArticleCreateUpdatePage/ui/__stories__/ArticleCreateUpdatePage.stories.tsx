import { ComponentStory, ComponentMeta } from '@storybook/react';
import withMock from 'storybook-addon-mock';

import ArticleCreateUpdatePage from '../ArticleCreateUpdatePage';

import { testCategories, testTags } from '@/shared/lib/tests/const/testContstants';

export default {
  title: 'pages/ArticleCreateUpdatePage',
  component: ArticleCreateUpdatePage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
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
  decorators: [withMock],
} as ComponentMeta<typeof ArticleCreateUpdatePage>;

const Template: ComponentStory<typeof ArticleCreateUpdatePage> = () => <ArticleCreateUpdatePage />;

export const Default = Template.bind({});
Default.args = {};
