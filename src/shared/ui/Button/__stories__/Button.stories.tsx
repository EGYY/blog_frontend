import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button, ThemeButton } from '../Button';

export default {
  title: 'shared/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Text',
  theme: ThemeButton.DEFUALT,
};

export const Ghost = Template.bind({});
Ghost.args = {
  children: 'Text',
  theme: ThemeButton.GHOST,
};

export const GhostIcon = Template.bind({});
GhostIcon.args = {
  children: '>',
  theme: ThemeButton.GHOST_ICON,
};

export const Outline = Template.bind({});
Outline.args = {
  children: 'Text',
  theme: ThemeButton.OUTLINE,
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Text',
  theme: ThemeButton.SECONDARY,
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: 'Text',
  theme: ThemeButton.DEFUALT,
  disabled: true,
};

export const Loading = Template.bind({});
Loading.args = {
  children: 'Text',
  theme: ThemeButton.DEFUALT,
  loading: true,
};
