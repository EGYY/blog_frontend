import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Card } from '../../Card/Card';
import { Carousel } from '../Carousel';

export default {
    title: 'shared/Carousel',
    component: Carousel,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {
        children: [1, 2, 3].map((num) => <Card key={num}>Card {num}</Card>),
    },
} as ComponentMeta<typeof Carousel>;

const Template: ComponentStory<typeof Carousel> = (args) => (
    <Carousel {...args} />
);

export const Default = Template.bind({});
Default.args = {
    itemsPerView: 1,
};
