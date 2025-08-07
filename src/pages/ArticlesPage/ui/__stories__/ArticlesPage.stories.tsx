import { ComponentStory, ComponentMeta } from '@storybook/react';

import ArticlesPage from '../ArticlesPage';

import {
    testCategories,
    testTags,
} from '@/shared/lib/tests/const/testContstants';

export default {
    title: 'pages/ArticlesPage',
    component: ArticlesPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {},
    parameters: {
        mockData: [
            {
                url: `${__API_URL__}/article-categories`,
                method: 'GET',
                status: 200,
                response: testCategories,
            },
            {
                url: `${__API_URL__}/article-tags`,
                method: 'GET',
                status: 200,
                response: testTags,
            },
        ],
    },
} as ComponentMeta<typeof ArticlesPage>;

const Template: ComponentStory<typeof ArticlesPage> = () => <ArticlesPage />;

export const Default = Template.bind({});
Default.args = {};
