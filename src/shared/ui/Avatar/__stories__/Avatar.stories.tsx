import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Avatar } from '../Avatar';

export default {
    title: 'shared/Avatar',
    component: Avatar,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {
        src: 'https://placehold.co/150',
    },
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const Default = Template.bind({});
Default.args = {
    size: 'md',
};
