import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Article } from '../Article/Article/Article';

import { testArticle } from '@/shared/lib/tests/const/testContstants';

export default {
    title: 'entities/Article/Article',
    component: Article,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {
        article: testArticle,
    },
} as ComponentMeta<typeof Article>;

const Template: ComponentStory<typeof Article> = (args) => (
    <Article {...args} />
);

export const Default = Template.bind({});
Default.args = {};
