import { Flex, Text } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import React from 'react';

import { ArrowDownIcon } from '@/icons';

import { DynamicDataContainerColumn } from '@/common/interfaces';
import { Role } from '@/common/models';

const role = (classes: {
  [key: string]: string;
}): DynamicDataContainerColumn<Role>[] => [
  {
    key: 'name',
    render: (data: Role) => (
      <Flex gap={6} className={classes.nameContainer}>
        <Text>{data.name}</Text>
        {data.description && (
          <Text variant="subtitle" w="100%">
            {data.description}
          </Text>
        )}
      </Flex>
    ),
  },
  {
    key: 'action',
    render: () => <ArrowDownIcon size={18} className={classes.actionIcon} />,
  },
];

const newRole: DynamicDataContainerColumn<{ label: string }>[] = [
  {
    key: 'label',
    render: (data) => <Text>{data.label}</Text>,
  },
  {
    key: 'action',
    render: () => <IconPlus size={18} />,
  },
];

export default { role, newRole };
