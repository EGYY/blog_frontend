import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AccountMenu } from '../AccountMenu';

export default {
    title: 'features/AccountMenu',
    component: AccountMenu,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {},
} as ComponentMeta<typeof AccountMenu>;

const Template: ComponentStory<typeof AccountMenu> = (args) => (
    <AccountMenu {...args} />
);

export const Default = Template.bind({});
Default.args = {};
