import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Select } from '../Select';

export default {
    title: 'shared/Select',
    component: Select,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {
        label: 'Select',
        placeholder: 'Select value from list',
    },
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Default = Template.bind({});
Default.args = {
    options: [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
    ],
};

export const Group = Template.bind({});
Group.args = {
    groups: [
        {
            label: 'Group 1',
            options: [
                { label: 'Option 1.1', value: 'option1.1' },
                { label: 'Option 1.2', value: 'option1.2' },
            ],
        },
        {
            label: 'Group 2',
            options: [
                { label: 'Option 2.1', value: 'option2.1' },
                { label: 'Option 2.2', value: 'option2.2' },
            ],
        },
    ],
};
