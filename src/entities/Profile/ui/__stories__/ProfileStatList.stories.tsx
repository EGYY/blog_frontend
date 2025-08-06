import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ProfileStatList } from '../ProfileStatList/ProfileStatList';

import { testProfile } from '@/shared/lib/tests/const/testContstants';

export default {
    title: 'entities/Profile/ProfileStatList',
    component: ProfileStatList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {
        profile: testProfile,
    },
} as ComponentMeta<typeof ProfileStatList>;

const Template: ComponentStory<typeof ProfileStatList> = (args) => (
    <ProfileStatList {...args} />
);

export const Default = Template.bind({});
Default.args = {};
