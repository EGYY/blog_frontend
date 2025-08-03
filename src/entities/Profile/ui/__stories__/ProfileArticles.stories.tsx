import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ProfileArticles } from '../ProfileArticles/ProfileArticles';

import { testProfile } from '@/shared/lib/tests/const/testContstants';

export default {
  title: 'entities/Profile/ProfileArticles',
  component: ProfileArticles,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    articles: testProfile.articles,
  },
} as ComponentMeta<typeof ProfileArticles>;

const Template: ComponentStory<typeof ProfileArticles> = (args) => <ProfileArticles {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const WithActions = Template.bind({});
WithActions.args = {
  type: 'withActions',
};
