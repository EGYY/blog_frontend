import { ComponentStory, ComponentMeta } from '@storybook/react';

import { HtmlEditor } from '../HtmlEditor';

export default {
    title: 'features/HtmlEditor',
    component: HtmlEditor,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {},
} as ComponentMeta<typeof HtmlEditor>;

const Template: ComponentStory<typeof HtmlEditor> = (args) => (
    <HtmlEditor {...args} />
);

export const Default = Template.bind({});
Default.args = {};
