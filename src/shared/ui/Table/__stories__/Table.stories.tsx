import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Table } from '../Table';

export default {
  title: 'shared/Table',
  component: Table,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    columns: [
      {
        key: 'id', header: 'ID', width: 50, sortable: true,
      },
      {
        key: 'name', header: 'Name', filterable: true, sortable: true,
      },
      { key: 'email', header: 'Email' },
      { key: 'role', header: 'Role' },
    ],
    data: [
      {
        id: 1,
        name: 'Alice',
        email: 'alice@example.com',
        role: 'Admin',
      },
      {
        id: 2, name: 'Bob', email: 'bob@example.com', role: 'User',
      },
    ],
    stickyColumnCount: 1,
  },
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />;

export const Default = Template.bind({});
Default.args = {};
