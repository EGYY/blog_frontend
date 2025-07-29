import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from '../../Button/Button';
import { Tooltip } from '../Tooltip';

export default {
  title: 'shared/Tooltip',
  component: Tooltip,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    children: <Button>Hover me</Button>,
    content: 'You hovered over the button!',
  },
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = (args) => <Tooltip {...args} />;

export const Default = Template.bind({});
Default.args = {
  preferredPlacement: 'bottom',
};
