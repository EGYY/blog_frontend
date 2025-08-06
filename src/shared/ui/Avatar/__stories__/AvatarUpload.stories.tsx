import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AvatarUpload } from '../AvatarUpload';

export default {
    title: 'shared/AvatarUpload',
    component: AvatarUpload,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {
        src: 'https://placehold.co/150',
    },
} as ComponentMeta<typeof AvatarUpload>;

const Template: ComponentStory<typeof AvatarUpload> = (args) => (
    <AvatarUpload {...args} />
);

export const Default = Template.bind({});
Default.args = {
    size: 'md',
};
