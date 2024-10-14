import { Avatar, Badge, Flex, Text } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { TFunction } from 'i18next';
import React from 'react';
import { NavigateFunction } from 'react-router-dom';

import { Status } from '@/components';

import { paths, placeholders } from '@/common/constants';
import { CellRender, KeyPair } from '@/common/interfaces';
import { Device } from '@/common/models';
import { type } from '@/common/utils';

const columns = (
  classes: KeyPair<string>,
  t: TFunction,
  navigate: NavigateFunction,
  detachDevice: (device: Device) => void,
) => [
  {
    name: 'device.name',
    defaultFlex: 1,
    header: t('tables.accessDevices.cells.name'),
    render: ({ data }: CellRender<Device>) => (
      <Flex
        gap={6}
        className={classes.nameContainer}
        onClick={() =>
          navigate(paths.build(paths.SITES_DEVICES_ID, data.id.toString()))
        }
      >
        <Avatar
          size="sm"
          radius="sm"
          src={data.imageUrl || placeholders.RANDOM_PLACEHOLDER_URL}
        />
        <Text>{data.name}</Text>
      </Flex>
    ),
  },
  {
    name: 'device.type',
    defaultFlex: 1,
    header: t('tables.accessDevices.cells.deviceType'),
    editable: true,
    render: ({ data }: CellRender<Device>) => (
      <Badge variant={type.getTypeVariant(data.type)}>
        {t(type.getFormattedTypeName(data.type))}
      </Badge>
    ),
  },
  {
    name: 'device.status',
    defaultFlex: 1,
    header: t('tables.accessDevices.cells.status'),
    render: ({ data }: CellRender<Device>) => <Status status={data.status} />,
  },
  {
    name: 'action',
    header: '',
    render: ({ data }: CellRender<Device>) => (
      <IconX
        className={classes.actionIcon}
        onClick={() => detachDevice(data)}
      />
    ),
  },
];

export default columns;
