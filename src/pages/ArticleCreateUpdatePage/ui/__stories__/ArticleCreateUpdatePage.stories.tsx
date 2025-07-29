import { ComponentStory, ComponentMeta } from '@storybook/react';

import ArticleCreateUpdatePage from '../ArticleCreateUpdatePage';

export default {
  title: 'pages/ArticleCreateUpdatePage',
  component: ArticleCreateUpdatePage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
} as ComponentMeta<typeof ArticleCreateUpdatePage>;

const Template: ComponentStory<typeof ArticleCreateUpdatePage> = () => <ArticleCreateUpdatePage />;

export const Default = Template.bind({});
Default.args = {};
