import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ImageUpload } from '../ImageUpload';

export default {
    title: 'shared/ImageUpload',
    component: ImageUpload,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {
        src: 'https://placehold.co/150',
    },
} as ComponentMeta<typeof ImageUpload>;

const Template: ComponentStory<typeof ImageUpload> = (args) => (
    <ImageUpload {...args} />
);

export const Default = Template.bind({});
Default.args = {};
