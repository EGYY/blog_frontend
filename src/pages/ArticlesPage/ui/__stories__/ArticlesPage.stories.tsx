import { ComponentStory, ComponentMeta } from '@storybook/react';

import ArticlesPage from '../ArticlesPage';

export default {
  title: 'pages/ArticlesPage',
  component: ArticlesPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
} as ComponentMeta<typeof ArticlesPage>;

const Template: ComponentStory<typeof ArticlesPage> = () => <ArticlesPage />;

export const Default = Template.bind({});
Default.args = {};
