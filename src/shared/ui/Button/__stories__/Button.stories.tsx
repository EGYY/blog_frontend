import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from '../Button';

export default {
    title: 'shared/Button',
    component: Button,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
    children: 'Text',
    theme: 'default',
};

export const Ghost = Template.bind({});
Ghost.args = {
    children: 'Text',
    theme: 'ghost',
};

export const GhostIcon = Template.bind({});
GhostIcon.args = {
    children: '>',
    theme: 'ghostIcon',
};

export const Outline = Template.bind({});
Outline.args = {
    children: 'Text',
    theme: 'outline',
};

export const Secondary = Template.bind({});
Secondary.args = {
    children: 'Text',
    theme: 'secondary',
};

export const Disabled = Template.bind({});
Disabled.args = {
    children: 'Text',
    theme: 'default',
    disabled: true,
};

export const Loading = Template.bind({});
Loading.args = {
    children: 'Text',
    theme: 'default',
    loading: true,
};
