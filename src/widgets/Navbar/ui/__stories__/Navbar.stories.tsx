import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Navbar } from '../Navbar';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';

export default {
    title: 'widgets/Navbar',
    component: Navbar,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Navbar>;

const Template: ComponentStory<typeof Navbar> = (args) => <Navbar {...args} />;

export const Auth = Template.bind({});
Auth.args = {};

export const NoAuth = Template.bind({});
NoAuth.args = {};
NoAuth.decorators = [
    StoreDecorator({
        profile_detail: { profile: undefined },
    }),
];
