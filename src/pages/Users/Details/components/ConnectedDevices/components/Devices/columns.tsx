import { Avatar, Badge, Flex, Switch, Text } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { TFunction } from 'i18next';
import React from 'react';
import { NavigateFunction } from 'react-router-dom';

import { Status } from '@/components';

import { paths, placeholders } from '@/common/constants';
import { CellRender, KeyPair } from '@/common/interfaces';
import { Device } from '@/common/models';
import { status, type } from '@/common/utils';

const columns = (
  navigate: NavigateFunction,
  classes: KeyPair<string>,
  t: TFunction,
  changeUserVisibilityOnDevice: (device: Device, isVisible: boolean) => void,
  removeDevice: (device: Device) => void,
) => [
  {
    name: 'name',
    defaultFlex: 1,
    header: t('tables.connectedDevices.cells.name'),
    render: ({ data }: CellRender<Device & { isVisible: boolean }>) => (
      <Flex
        className={classes.nameCell}
        onClick={() =>
          navigate(paths.build(paths.SITES_DEVICES_ID, data.id.toString()))
        }
      >
        <Avatar
          size="sm"
          alt="Device image"
          src={
            data?.imageUrl ||
            `${placeholders.IMAGE_PLACEHOLDERS_URL}/${placeholders.SITE_PLACEHOLDER.SITE_A}`
          }
        />
        <Text>{data.name}</Text>
      </Flex>
    ),
  },
  {
    name: 'deviceType',
    defaultFlex: 1,
    header: t('tables.connectedDevices.cells.deviceType'),
    render: ({ data }: CellRender<Device & { isVisible: boolean }>) => (
      <Badge variant={type.getTypeVariant(data.type)} key={data.id}>
        {t(type.getFormattedTypeName(data.type))}
      </Badge>
    ),
  },
  {
    name: 'address',
    defaultFlex: 1,
    header: t('tables.connectedDevices.cells.address'),
    editable: true,
    render: ({ data }: CellRender<Device & { isVisible: boolean }>) => {
      const { site } = data as Device;
      return (
        <Text variant="subtitle">
          {site.address
            ? `${site.address.street || '-'}, ${
                site.address.postalCode || '-'
              } ${site.address.city || '-'}${
                site.address.country ? `, ${site.address.country?.name}` : ''
              }`
            : '-'}
        </Text>
      );
    },
  },
  {
    name: 'lockStatus',
    defaultFlex: 1,
    header: t('tables.connectedDevices.cells.lockStatus'),
    render: ({ data }: CellRender<Device & { isVisible: boolean }>) => (
      <Badge
        variant={status.getStatusVariant(data.configuration?.lockStatus ?? '-')}
      >
        {t(
          status.getFormattedStatusName(data.configuration?.lockStatus ?? '-'),
        )}
      </Badge>
    ),
  },
  {
    name: 'status',
    defaultFlex: 1,
    header: t('tables.connectedDevices.cells.status'),
    render: ({ data }: CellRender<Device & { isVisible: boolean }>) => (
      <Status status={data.status} />
    ),
  },
  {
    name: 'isUserVisible',
    defaultFlex: 1,
    header: t('tables.connectedDevices.cells.isUserVisible'),
    render: ({ data }: CellRender<Device & { isVisible: boolean }>) => (
      <Switch
        defaultChecked={data.isVisible}
        onChange={() => changeUserVisibilityOnDevice(data, !data.isVisible)}
      />
    ),
  },
  {
    name: 'action',
    header: t('common.remove'),
    width: 100,
    render: ({ data }: CellRender<Device & { isVisible: boolean }>) => (
      <Flex className={classes.cell} onClick={() => removeDevice(data)}>
        <IconX className="icon" />
      </Flex>
    ),
  },
];

export default columns;
