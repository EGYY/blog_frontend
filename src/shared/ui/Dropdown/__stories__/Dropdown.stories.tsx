import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from '../../Button/Button';
import { Dropdown } from '../Dropdown';

export default {
    title: 'shared/Dropdown',
    component: Dropdown,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {
        trigger: <Button>Click me</Button>,
        children: 'Hi i am text Dropdown',
    },
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => (
    <Dropdown {...args} />
);

export const Default = Template.bind({});
Default.args = {};
