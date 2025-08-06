import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ProfileMainInfo } from '../..';

import { testProfile } from '@/shared/lib/tests/const/testContstants';

export default {
    title: 'entities/Profile/ProfileMainInfo',
    component: ProfileMainInfo,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {
        profile: testProfile,
    },
} as ComponentMeta<typeof ProfileMainInfo>;

const Template: ComponentStory<typeof ProfileMainInfo> = (args) => (
    <ProfileMainInfo {...args} />
);

export const Default = Template.bind({});
Default.args = {};
