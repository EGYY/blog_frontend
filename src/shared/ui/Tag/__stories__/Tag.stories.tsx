import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Tag } from '../Tag';

export default {
  title: 'shared/Tag',
  component: Tag,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
} as ComponentMeta<typeof Tag>;

const Template: ComponentStory<typeof Tag> = (args) => <Tag {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Default tag',
  variant: 'default',
};

export const Error = Template.bind({});
Error.args = {
  children: 'Error tag',
  variant: 'error',
};

export const Success = Template.bind({});
Success.args = {
  children: 'Success tag',
  variant: 'success',
};

export const Warning = Template.bind({});
Warning.args = {
  children: 'Warning tag',
  variant: 'warning',
};

export const Info = Template.bind({});
Info.args = {
  children: 'Info tag',
  variant: 'info',
};

export const Outline = Template.bind({});
Outline.args = {
  children: 'Outline tag',
  variant: 'outline',
};
