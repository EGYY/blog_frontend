import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ArticlesFilters } from '../ArticlesFilters';

import {
    testCategories,
    testTags,
} from '@/shared/lib/tests/const/testContstants';

export default {
    title: 'features/ArticlesFilters',
    component: ArticlesFilters,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {},
} as ComponentMeta<typeof ArticlesFilters>;

const Template: ComponentStory<typeof ArticlesFilters> = (args) => (
    <ArticlesFilters {...args} />
);

export const Default = Template.bind({});
Default.parameters = {
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
};
