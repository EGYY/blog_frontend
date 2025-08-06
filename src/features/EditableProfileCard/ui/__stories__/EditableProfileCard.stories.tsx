import { ComponentStory, ComponentMeta } from '@storybook/react';

import { EditableProfileCard } from '../EditableProfileCard';

import { testUser } from '@/shared/lib/tests/const/testContstants';

export default {
    title: 'features/EditableProfileCard',
    component: EditableProfileCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {
        user: testUser,
    },
} as ComponentMeta<typeof EditableProfileCard>;

const Template: ComponentStory<typeof EditableProfileCard> = (args) => (
    <EditableProfileCard {...args} />
);

export const Default = Template.bind({});
Default.args = {};
