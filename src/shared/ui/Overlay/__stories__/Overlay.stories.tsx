import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Card } from '../../Card/Card';
import { Overlay } from '../Overlay';

export default {
  title: 'shared/Overlay',
  component: Overlay,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    children: <Card>Text card with overlay</Card>,
  },
} as ComponentMeta<typeof Overlay>;

const Template: ComponentStory<typeof Overlay> = (args) => <Overlay {...args} />;

export const Default = Template.bind({});
Default.args = {};
