import { ComponentStory, ComponentMeta } from '@storybook/react';

import Breadcrumb from '../Breadcrumb';

export default {
    title: 'shared/Breadcrumb',
    component: Breadcrumb,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {
        items: [
            { label: 'Главная', href: '/' },
            { label: 'Профиль', href: '/profile' },
            { label: 'Редактирование профиля', href: '/profile/edit' },
        ],
    },
} as ComponentMeta<typeof Breadcrumb>;

const Template: ComponentStory<typeof Breadcrumb> = (args) => (
    <Breadcrumb {...args} />
);

export const Default = Template.bind({});
Default.args = {};
