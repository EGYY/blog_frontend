import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Skeleton } from '../Skeleton';

export default {
    title: 'shared/Skeleton',
    component: Skeleton,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {},
} as ComponentMeta<typeof Skeleton>;

const Template: ComponentStory<typeof Skeleton> = (args) => (
    <Skeleton {...args} />
);

export const Default = Template.bind({});
Default.args = {
    width: 200,
    height: 200,
};

export const Circle = Template.bind({});
Circle.args = {
    circle: true,
    width: 100,
    height: 100,
};
