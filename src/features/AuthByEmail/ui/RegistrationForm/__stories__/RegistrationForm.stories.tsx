import { ComponentStory, ComponentMeta } from '@storybook/react';

import RegistrationForm from '../RegistrationForm';

export default {
    title: 'features/RegistrationForm',
    component: RegistrationForm,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof RegistrationForm>;

const Template: ComponentStory<typeof RegistrationForm> = (args) => (
    <RegistrationForm {...args} />
);

export const Default = Template.bind({});
Default.args = {};
