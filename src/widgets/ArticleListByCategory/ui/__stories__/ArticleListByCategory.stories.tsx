import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ArticleListByCategory } from '../ArticleListByCategory';

import { testArticle } from '@/shared/lib/tests/const/testContstants';

export default {
    title: 'widgets/ArticleListByCategory',
    component: ArticleListByCategory,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {
        categories: [
            { id: '1', name: 'Frontend' },
            { id: '2', name: 'Backend' },
        ],
        articles: ['1', '2', '3', '4'].map((id) => ({ ...testArticle, id })),
    },
} as ComponentMeta<typeof ArticleListByCategory>;

const Template: ComponentStory<typeof ArticleListByCategory> = (args) => (
    <ArticleListByCategory {...args} />
);

export const Default = Template.bind({});
Default.args = {};
