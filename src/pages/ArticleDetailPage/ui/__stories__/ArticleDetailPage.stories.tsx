import { ComponentStory, ComponentMeta } from '@storybook/react';

import ArticleDetailPage from '../ArticleDetailPage';

export default {
  title: 'pages/ArticleDetailPage',
  component: ArticleDetailPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
} as ComponentMeta<typeof ArticleDetailPage>;

const Template: ComponentStory<typeof ArticleDetailPage> = () => <ArticleDetailPage />;

export const Default = Template.bind({});
Default.args = {};
