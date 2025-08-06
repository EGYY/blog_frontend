import { ComponentStory, ComponentMeta } from '@storybook/react';

import Tabs from '../Tabs';

export default {
    title: 'shared/Tabs',
    component: Tabs,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {
        tabs: [
            { id: 'tab1', title: 'Tab 1', content: 'Content of Tab 1' },
            { id: 'tab2', title: 'Tab 2', content: 'Content of Tab 2' },
        ],
        defaultTabId: 'tab1',
    },
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />;

export const Default = Template.bind({});
Default.args = {};
