import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Image } from '../Image';

export default {
    title: 'shared/Image',
    component: Image,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {
        src: 'https://placehold.co/150',
    },
} as ComponentMeta<typeof Image>;

const Template: ComponentStory<typeof Image> = (args) => <Image {...args} />;

export const Default = Template.bind({});
Default.args = {};
