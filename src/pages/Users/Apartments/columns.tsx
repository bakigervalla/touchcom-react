import { Avatar, Badge, Flex, Text } from '@mantine/core';
import { IconQuestionMark } from '@tabler/icons-react';
import { TFunction } from 'i18next';
import { uniqBy as _uniqBy } from 'lodash';
import React from 'react';
import { NavigateFunction } from 'react-router-dom';

import { Status } from '@/components';

import { paths, placeholders } from '@/common/constants';
import { CellRender, KeyPair } from '@/common/interfaces';
import { AccessControl, Apartment, Device, Site } from '@/common/models';
import { common, type } from '@/common/utils';

const columns = (
  navigate: NavigateFunction,
  classes: KeyPair<string>,
  t: TFunction,
) => [
  {
    name: 'name',
    defaultFlex: 1,
    header: t('tables.users.cells.name'),
    render: ({ data }: CellRender<Apartment>) => (
      <Flex
        className={classes.nameCell}
        onClick={() =>
          navigate(paths.build(paths.SITES_USERS_ID, data.id.toString()))
        }
      >
        <Avatar
          size="sm"
          radius="xl"
          src={
            data.imageUrl ||
            `${placeholders.IMAGE_PLACEHOLDERS_URL}/${placeholders.SITE_PLACEHOLDER.SITE_A}`
          }
        />
        <Text>{data.name}</Text>
      </Flex>
    ),
  },
  {
    name: 'role',
    defaultFlex: 1,
    header: t('tables.users.cells.role'),
    render: ({ data }: CellRender<Apartment>) => data.role?.name ?? '-',
  },
  {
    name: 'address',
    defaultFlex: 1,
    header: 'Address',
    editable: true,
    render: ({ data }: CellRender<Apartment>) => (
      <Text variant="subtitle">
        {common.getFormattedAddress({
          address: data?.address,
        } as Site)}
      </Text>
    ),
  },
  {
    name: 'floor',
    defaultFlex: 1,
    header: t('tables.users.cells.floor'),
  },
  {
    name: 'accessKeys',
    defaultFlex: 1,
    header: t('tables.users.cells.accessKeys'),
    render: ({ data }: CellRender<Apartment>) => {
      const accessControls = _uniqBy(data.accessControls, 'accessKey.id');
      const hasUserAccessKeys = accessControls.some(
        (accessControl: AccessControl) => !!accessControl.accessKey,
      );
      const totalAccessKeys = accessControls.length;
      return accessControls.length > 0 && hasUserAccessKeys ? (
        <Flex gap={6}>
          {accessControls.slice(0, 2).map((accessControl: AccessControl) => (
            <Badge variant="neutral-outlined" key={accessControl.id}>
              {accessControl.accessKey?.name ?? '-'}{' '}
              {accessControl?.accessKey?.number
                ? `#${accessControl?.accessKey?.number}`
                : ''}
            </Badge>
          ))}
          {totalAccessKeys > 2 && (
            <Badge variant="neutral">{`${totalAccessKeys - 2}+`}</Badge>
          )}
        </Flex>
      ) : (
        <Flex className={classes.userContainer}>
          <Avatar
            size="sm"
            radius="xl"
            alt="User image"
            className="iconContainer"
          >
            <IconQuestionMark size={18} />
          </Avatar>
          <Text>N/A</Text>
        </Flex>
      );
    },
  },
  {
    name: 'status',
    defaultFlex: 1,
    header: t('tables.users.cells.status'),
    render: ({ data }: CellRender<Apartment>) => (
      <Status status={data.status} />
    ),
  },
  {
    name: 'phone',
    defaultFlex: 1,
    header: t('tables.users.cells.phone'),
    render: ({ data }: CellRender<Apartment>) => (
      <Text variant="subtitle">{data.phone}</Text>
    ),
  },
  {
    name: 'email',
    defaultFlex: 1,
    header: t('tables.users.cells.email'),
    render: ({ data }: CellRender<Apartment>) => (
      <Text variant="subtitle">{data.email}</Text>
    ),
  },
  {
    name: 'devices',
    defaultFlex: 1,
    header: t('tables.users.cells.devices'),
    render: ({ data }: CellRender<Apartment>) => {
      const accessControls = _uniqBy(data.accessControls, 'deviceId');
      const hasUserDevices = accessControls.some(
        (accessControl: AccessControl) => !!accessControl.deviceId,
      );
      const totalDevices = accessControls.length;
      return accessControls.length > 0 && hasUserDevices ? (
        <Flex gap={6}>
          {accessControls.slice(0, 2).map((accessControl: AccessControl) => (
            <Badge
              key={accessControl.id}
              variant={type.getTypeVariant(
                (accessControl.device as Device)?.type ?? '',
              )}
            >
              {t(
                type.getFormattedTypeName(
                  (accessControl.device as Device)?.type ?? '',
                ),
              )}
            </Badge>
          ))}
          {totalDevices > 2 && (
            <Badge variant="neutral">{`${totalDevices - 2}+`}</Badge>
          )}
        </Flex>
      ) : (
        <Flex className={classes.userContainer}>
          <Avatar
            size="sm"
            radius="xl"
            alt="User image"
            className="iconContainer"
          >
            <IconQuestionMark size={18} />
          </Avatar>
          <Text>N/A</Text>
        </Flex>
      );
    },
  },
  {
    name: 'accessLevels',
    defaultFlex: 1,
    header: t('tables.users.cells.accessLevels'),
    render: ({ data }: CellRender<Apartment>) => {
      const accessControls = _uniqBy(data.accessControls, 'accessGroupId');
      const hasUserAccessLevels = accessControls.some(
        (accessControl: AccessControl) => !!accessControl.accessGroupId,
      );
      const totalAccessGroups = accessControls.length;
      return accessControls.length > 0 && hasUserAccessLevels ? (
        <Flex gap={6}>
          {accessControls.slice(0, 2).map((accessControl: AccessControl) => (
            <Badge variant="neutral-outlined" key={accessControl.id}>
              {accessControl.accessGroup?.name ?? '-'}
            </Badge>
          ))}
          {totalAccessGroups > 2 && (
            <Badge variant="neutral">{`${totalAccessGroups - 2}+`}</Badge>
          )}
        </Flex>
      ) : (
        <Flex className={classes.userContainer}>
          <Avatar
            size="sm"
            radius="xl"
            alt="User image"
            className="iconContainer"
          >
            <IconQuestionMark size={18} />
          </Avatar>
          <Text>N/A</Text>
        </Flex>
      );
    },
  },
];

export default columns;
