import { TypeColumn } from '@inovua/reactdatagrid-community/types';
import { Text } from '@mantine/core';
import React from 'react';

const columns: TypeColumn[] = [
  {
    name: 'date',
    defaultFlex: 1,
    header: 'Date & Time',
  },
  {
    name: 'description',
    defaultFlex: 1,
    header: 'Description',
    editable: true,
    render: ({ value }) => <Text style={{ color: '#56BC23' }}>{value}</Text>,
  },
  {
    name: 'user',
    defaultFlex: 1,
    header: 'User',
    render: ({ value }: { value: { id: number; name: string } }) => (
      <Text>{value.name}</Text>
    ),
  },
];

export default columns;
