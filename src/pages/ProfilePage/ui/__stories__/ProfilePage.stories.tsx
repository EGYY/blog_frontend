import { ComponentMeta, ComponentStory } from '@storybook/react';

import ProfilePage from '../ProfilePage';

export default {
    title: 'pages/ProfilePage',
    component: ProfilePage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {},
} as ComponentMeta<typeof ProfilePage>;

const Template: ComponentStory<typeof ProfilePage> = () => <ProfilePage />;

export const Default = Template.bind({});
Default.args = {};
