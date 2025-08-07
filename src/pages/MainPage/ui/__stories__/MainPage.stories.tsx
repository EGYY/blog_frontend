import { ComponentStory, ComponentMeta } from '@storybook/react';

import MainPage from '../MainPage';

import {
    testArticle,
    testCategories,
} from '@/shared/lib/tests/const/testContstants';

export default {
    title: 'pages/MainPage',
    component: MainPage,
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
                url: `${__API_URL__}/articles?limit=50`,
                method: 'GET',
                status: 200,
                response: {
                    data: ['1', '2', '3', '4', '5'].map((id) => ({
                        ...testArticle,
                        id,
                    })),
                    limit: 50,
                    page: 1,
                    total: 5,
                },
            },
        ],
    },
} as ComponentMeta<typeof MainPage>;

const Template: ComponentStory<typeof MainPage> = () => <MainPage />;

export const Default = Template.bind({});
Default.args = {};
