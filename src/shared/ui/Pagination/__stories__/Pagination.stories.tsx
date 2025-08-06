import { ComponentStory, ComponentMeta } from '@storybook/react';

import Pagination from '../Pagination';

export default {
    title: 'shared/Pagination',
    component: Pagination,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {
        currentPage: 1,
        totalPages: 20,
    },
} as ComponentMeta<typeof Pagination>;

const Template: ComponentStory<typeof Pagination> = (args) => (
    <Pagination {...args} />
);

export const Default = Template.bind({});
Default.args = {};
