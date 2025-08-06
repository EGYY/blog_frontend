import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Drawer } from '../Drawer';

export default {
    title: 'shared/Drawer',
    component: Drawer,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {},
} as ComponentMeta<typeof Drawer>;

const Template: ComponentStory<typeof Drawer> = (args) => <Drawer {...args} />;

export const Default = Template.bind({});
Default.args = {
    children: 'Hi i am text Drawer',
    isOpen: true,
    onClose: () => {},
};
