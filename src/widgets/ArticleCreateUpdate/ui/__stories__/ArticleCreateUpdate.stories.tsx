import { ComponentStory, ComponentMeta } from '@storybook/react';
import withMock from 'storybook-addon-mock';

import { ArticleCreateUpdate } from '../ArticleCreateUpdate';

import { testArticle, testCategories, testTags } from '@/shared/lib/tests/const/testContstants';

export default {
  title: 'widgets/ArticleCreateUpdate',
  component: ArticleCreateUpdate,
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
} as ComponentMeta<typeof ArticleCreateUpdate>;

const Template: ComponentStory<typeof ArticleCreateUpdate> = (args) => <ArticleCreateUpdate {...args} />;

export const Create = Template.bind({});
Create.args = {};

export const Update = Template.bind({});
Update.args = {
  article: testArticle,
};
