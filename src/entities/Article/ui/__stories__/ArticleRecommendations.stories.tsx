import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ArticleRecommendations } from '../..';

import { testArticle } from '@/shared/lib/tests/const/testContstants';

export default {
    title: 'entities/Article/ArticleRecommendations',
    component: ArticleRecommendations,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {
        data: ['1', '2', '3'].map((id) => ({ ...testArticle, id })),
    },
} as ComponentMeta<typeof ArticleRecommendations>;

const Template: ComponentStory<typeof ArticleRecommendations> = (args) => (
    <ArticleRecommendations {...args} />
);

export const Default = Template.bind({});
Default.args = {};
