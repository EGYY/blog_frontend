import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ProfileLastArticles } from '../ProfileLastArticles/ProfileLastArticles';

import { testProfile } from '@/shared/lib/tests/const/testContstants';

export default {
  title: 'entities/Profile/ProfileLastArticles',
  component: ProfileLastArticles,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    profile: testProfile,
  },
} as ComponentMeta<typeof ProfileLastArticles>;

const Template: ComponentStory<typeof ProfileLastArticles> = (args) => <ProfileLastArticles {...args} />;

export const Default = Template.bind({});
Default.args = {};
