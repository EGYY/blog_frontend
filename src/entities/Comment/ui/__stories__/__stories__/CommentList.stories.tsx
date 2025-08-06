import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CommentList } from '../../CommentList/CommentList';

import { testComments } from '@/shared/lib/tests/const/testContstants';

export default {
    title: 'entities/Comment/CommentList',
    component: CommentList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {
        data: testComments,
    },
} as ComponentMeta<typeof CommentList>;

const Template: ComponentStory<typeof CommentList> = (args) => (
    <CommentList {...args} />
);

export const Default = Template.bind({});
Default.args = {};
