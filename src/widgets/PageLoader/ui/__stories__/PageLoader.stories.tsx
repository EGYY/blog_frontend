import { ComponentStory, ComponentMeta } from '@storybook/react';

import { PageLoader } from '../PageLoader';

export default {
  title: 'widgets/PageLoader',
  component: PageLoader,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof PageLoader>;

const Template: ComponentStory<typeof PageLoader> = (args) => <PageLoader {...args} />;

export const Default = Template.bind({});
Default.args = {};
