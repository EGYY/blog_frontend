import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ProfileViewer } from '../ProfileViewer';

export default {
    title: 'widgets/ProfileViewer',
    component: ProfileViewer,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfileViewer>;

const Template: ComponentStory<typeof ProfileViewer> = (args) => (
    <ProfileViewer {...args} />
);

export const Default = Template.bind({});
Default.args = {};
