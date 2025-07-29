import { ComponentStory, ComponentMeta } from '@storybook/react';
import withMock from 'storybook-addon-mock';

import { NotificationList } from '../NotificationList/NotificationList';

import { testNotification } from '@/shared/lib/tests/const/testContstants';

export default {
  title: 'entities/Notification/NotificationList',
  component: NotificationList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
  decorators: [withMock],
  parameters: {
    mockData: [
      {
        url: `${__SERVER_URL__}/notifications`,
        method: 'GET',
        status: 200,
        response: [{ ...testNotification, id: '1' }, { ...testNotification, id: '2' }, { ...testNotification, id: '3' }],
      },
    ],
  },
} as ComponentMeta<typeof NotificationList>;

const Template: ComponentStory<typeof NotificationList> = (args) => <NotificationList {...args} />;

export const Default = Template.bind({});
Default.args = {};
