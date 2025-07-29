import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ArticlesViewSwitcher } from '../ArticlesViewSwitcher';

export default {
  title: 'features/ArticlesViewSwitcher',
  component: ArticlesViewSwitcher,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
} as ComponentMeta<typeof ArticlesViewSwitcher>;

const Template: ComponentStory<typeof ArticlesViewSwitcher> = (args) => <ArticlesViewSwitcher {...args} />;

export const Default = Template.bind({});
Default.args = {};
