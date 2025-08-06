import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ArticleList } from '../..';

import { testArticle } from '@/shared/lib/tests/const/testContstants';

export default {
    title: 'entities/Article/ArticleList',
    component: ArticleList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {
        articles: ['1', '2', '3'].map((id) => ({ ...testArticle, id })),
    },
} as ComponentMeta<typeof ArticleList>;

const Template: ComponentStory<typeof ArticleList> = (args) => (
    <ArticleList {...args} />
);

export const Default = Template.bind({});
Default.args = {};
