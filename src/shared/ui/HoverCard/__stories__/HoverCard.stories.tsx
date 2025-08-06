import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from '../../Button/Button';
import { HoverCard } from '../HoverCard';

export default {
    title: 'shared/HoverCard',
    component: HoverCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {
        trigger: (
            <Button
                onClick={() => new MouseEvent('mouseenter', { bubbles: true })}
                id="hoverButton"
            >
                Hover me
            </Button>
        ),
        content: <p>Hi i am text HoverCard</p>,
        side: 'right',
    },
} as ComponentMeta<typeof HoverCard>;

const Template: ComponentStory<typeof HoverCard> = (args) => (
    <HoverCard {...args} />
);

export const Default = Template.bind({});
Default.args = {};
