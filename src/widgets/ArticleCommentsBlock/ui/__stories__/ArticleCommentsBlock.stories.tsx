import { ComponentStory, ComponentMeta } from '@storybook/react';

import ArticleCommentsBlock from '../ArticleCommentsBlock';

export default {
    title: 'widgets/ArticleCommentsBlock',
    component: ArticleCommentsBlock,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {
        articleId: '1',
    },
} as ComponentMeta<typeof ArticleCommentsBlock>;

const Template: ComponentStory<typeof ArticleCommentsBlock> = (args) => (
    <ArticleCommentsBlock {...args} />
);

export const Default = Template.bind({});
Default.args = {};
