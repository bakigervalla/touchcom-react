import { Avatar, Badge, Flex, Text } from '@mantine/core';
import { TFunction } from 'i18next';
import { uniqBy as _uniqBy } from 'lodash';
import moment from 'moment';
import React from 'react';
import { NavigateFunction } from 'react-router-dom';

import { Status } from '@/components';

import { paths, placeholders } from '@/common/constants';
import { CellRender, KeyPair } from '@/common/interfaces';
import { AccessControl, Device } from '@/common/models';
import { common, status, type } from '@/common/utils';

const columns = (
  navigate: NavigateFunction,
  classes: KeyPair<string>,
  t: TFunction,
) => [
  {
    name: 'name',
    defaultFlex: 1,
    header: t('tables.accessDevices.cells.name'),
    render: ({ data }: CellRender<Device>) => (
      <Flex
        className={classes.nameCell}
        onClick={() =>
          navigate(paths.build(paths.SITES_DEVICES_ID, data.id.toString()))
        }
      >
        <Avatar
          src={
            data.imageUrl ||
            `${placeholders.IMAGE_PLACEHOLDERS_URL}/${placeholders.DEVICE_PLACEHOLDER.DEVICE_A}`
          }
          radius="sm"
          size="sm"
        />
        <Text>{data.name}</Text>
      </Flex>
    ),
  },
  {
    name: 'type',
    defaultFlex: 1,
    header: t('tables.accessDevices.cells.deviceType'),
    render: ({ data }: CellRender<Device>) => (
      <Badge variant={type.getTypeVariant(data.type)}>
        {t(type.getFormattedTypeName(data.type))}
      </Badge>
    ),
  },
  {
    name: 'site.address',
    defaultFlex: 1,
    header: t('tables.accessDevices.cells.address'),
    editable: false,
    render: ({ data }: CellRender<Device>) => (
      <Text variant="subtitle">{common.getFormattedAddress(data.site)}</Text>
    ),
  },
  {
    name: 'lockStatus',
    defaultFlex: 1,
    header: t('tables.accessDevices.cells.lockStatus'),
    render: ({ data }: CellRender<Device>) => (
      <Badge
        variant={status.getStatusVariant(data.configuration?.lockStatus ?? '')}
      >
        {t(status.getFormattedStatusName(data.configuration?.lockStatus ?? ''))}
      </Badge>
    ),
  },
  {
    name: 'users',
    defaultFlex: 1,
    header: t('tables.accessDevices.cells.connectedUsers'),
    render: ({ data }: CellRender<Device>) => {
      const accessControls = _uniqBy(data.accessControls, 'user.id');
      const totalUsers = accessControls.length;
      return (
        <Flex gap={6}>
          {accessControls
            .slice(0, 5)
            .map((accessControl: AccessControl, index: number) => (
              <Avatar
                key={accessControl?.user?.id ?? '-'}
                size="sm"
                radius="xl"
                src={
                  data.imageUrl ||
                  `${placeholders.IMAGE_PLACEHOLDERS_URL}/${placeholders.DEVICE_PLACEHOLDER.DEVICE_A}`
                }
                style={{ zIndex: index + 1, marginLeft: index ? -20 : 0 }}
              />
            ))}
          {totalUsers > 4 && (
            <Avatar
              size="sm"
              radius="xl"
              color="orange"
              style={{
                zIndex: totalUsers + 1,
                marginLeft: totalUsers ? -20 : 0,
              }}
            >
              {`${totalUsers - 4}+`}
            </Avatar>
          )}
        </Flex>
      );
    },
  },
  {
    name: 'status',
    defaultFlex: 1,
    header: t('tables.accessDevices.cells.status'),
    render: ({ data }: CellRender<Device>) => <Status status={data.status} />,
  },
  {
    name: 'version',
    defaultFlex: 1,
    header: t('tables.accessDevices.cells.version'),
    render: ({ data }: CellRender<Device>) => (
      <Badge variant="neutral-outlined">{data.version.tag}</Badge>
    ),
  },
  {
    name: 'createdAt',
    defaultFlex: 1,
    header: t('tables.accessDevices.cells.createdAt'),
    render: ({ data }: CellRender<Device>) =>
      moment(data.createdAt).format('DD/MM/YYYY'),
  },
];

export default columns;
