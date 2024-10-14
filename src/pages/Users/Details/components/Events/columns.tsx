import { TypeColumn } from '@inovua/reactdatagrid-community/types';
import { Badge, Text } from '@mantine/core';
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
    name: 'deviceType',
    defaultFlex: 1,
    header: 'Device',
    render: ({
      value,
    }: {
      value: { name: string; type: 'DOOR' | 'PANEL' };
    }) => (
      <Badge
        variant={value.type === 'DOOR' ? 'info' : 'warning'}
        key={value.name}
      >
        {value.name}
      </Badge>
    ),
  },
];

export default columns;
