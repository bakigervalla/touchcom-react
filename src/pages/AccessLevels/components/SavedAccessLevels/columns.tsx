import { Switch, Text } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { TFunction } from 'i18next';
import { uniqBy as _uniqBy } from 'lodash';
import pluralize from 'pluralize';
import React from 'react';

import { ArrowDownIcon } from '@/icons';

import { DynamicDataContainerColumn, KeyPair } from '@/common/interfaces';
import { AccessLevel, AccessLevelStatus } from '@/common/models';

const accessLevel = (
  handleUpdate: (accessLevel: AccessLevel) => void,
  classes: KeyPair<string>,
  t: TFunction,
): DynamicDataContainerColumn<AccessLevel>[] => [
  {
    key: 'name',
    render: (data) => <Text>{data.name}</Text>,
  },
  {
    key: 'totalDevices',
    render: (data) => (
      <Text variant="subtitle">
        {data.totalDevices} {pluralize(t('common.device'), data.totalDevices)}
      </Text>
    ),
  },
  {
    key: 'isActive',
    render: (data) => (
      <Switch
        defaultChecked={data.status === AccessLevelStatus.ACTIVE}
        onChange={() =>
          handleUpdate({
            ...data,
            status:
              data.status === AccessLevelStatus.ACTIVE
                ? AccessLevelStatus.INACTIVE
                : AccessLevelStatus.ACTIVE,
          })
        }
      />
    ),
  },
  {
    key: 'action',
    render: () => <ArrowDownIcon size={18} className={classes.actionIcon} />,
  },
];

const newAccessLevel: DynamicDataContainerColumn<{ label: string }>[] = [
  {
    key: 'label',
    render: (data) => <Text>{data.label}</Text>,
  },
  {
    key: 'action',
    render: () => <IconPlus size={18} />,
  },
];

export default { accessLevel, newAccessLevel };
