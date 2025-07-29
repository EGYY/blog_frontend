import { ComponentStory, ComponentMeta } from '@storybook/react';

import ProfileDetailPage from '../ProfileDetailPage';

export default {
  title: 'pages/ProfileDetailPage',
  component: ProfileDetailPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
} as ComponentMeta<typeof ProfileDetailPage>;

const Template: ComponentStory<typeof ProfileDetailPage> = () => <ProfileDetailPage />;

export const Default = Template.bind({});
Default.args = {};
