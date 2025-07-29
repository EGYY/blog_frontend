import { ComponentStory, ComponentMeta } from '@storybook/react';
import withMock from 'storybook-addon-mock';

import { ArticlesListHeader } from '../ArticlesListHeader';

import { testCategories, testTags } from '@/shared/lib/tests/const/testContstants';

export default {
  title: 'widgets/ArticlesListHeader',
  component: ArticlesListHeader,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
  decorators: [withMock],
} as ComponentMeta<typeof ArticlesListHeader>;

const Template: ComponentStory<typeof ArticlesListHeader> = (args) => <ArticlesListHeader {...args} />;

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {
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
};
