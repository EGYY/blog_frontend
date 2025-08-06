import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Modal } from '../Modal';

export default {
    title: 'shared/Modal',
    component: Modal,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Default = Template.bind({});
Default.args = {
    open: true,
    children: 'Text modal',
};
