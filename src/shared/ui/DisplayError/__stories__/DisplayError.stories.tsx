import { ComponentStory, ComponentMeta } from '@storybook/react';

import { DisplayError } from '../DisplayError';

export default {
    title: 'shared/DisplayError',
    component: DisplayError,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof DisplayError>;

const Template: ComponentStory<typeof DisplayError> = (args) => (
    <DisplayError {...args} />
);

export const Default = Template.bind({});
Default.args = {};
