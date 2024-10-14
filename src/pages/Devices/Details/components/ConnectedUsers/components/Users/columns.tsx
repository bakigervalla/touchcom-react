import { Avatar, Badge, Flex, Switch, Text } from '@mantine/core';
import { IconUserMinus } from '@tabler/icons-react';
import { TFunction } from 'i18next';
import React from 'react';
import { NavigateFunction } from 'react-router-dom';

import { paths, placeholders } from '@/common/constants';
import { CellRender, KeyPair } from '@/common/interfaces';
import { AccessLevel, User } from '@/common/models';
import { status } from '@/common/utils';

const columns = (
  navigate: NavigateFunction,
  classes: KeyPair<string>,
  t: TFunction,
  changeUserVisibility: (user: User, isVisible: boolean) => void,
  removeUser: (user: User) => void,
) => [
  {
    name: 'user',
    defaultFlex: 1,
    header: t('tables.connectedUsers.cells.user'),
    render: ({
      data,
    }: CellRender<User & { isVisible: boolean; accessGroup: AccessLevel }>) => (
      <Flex
        className={classes.cell}
        onClick={() =>
          navigate(paths.build(paths.SITES_USERS_ID, data.id.toString()))
        }
      >
        <Avatar
          size="sm"
          alt="User image"
          src={
            data.imageUrl ||
            `${placeholders.IMAGE_PLACEHOLDERS_URL}/${placeholders.SITE_PLACEHOLDER.SITE_A}`
          }
        />
        <Text>{data.email}</Text>
      </Flex>
    ),
  },
  {
    name: 'accessGroup',
    defaultFlex: 1,
    header: t('tables.connectedUsers.cells.accessLevel'),
    render: ({
      data,
    }: CellRender<User & { isVisible: boolean; accessGroup: AccessLevel }>) => (
      <Badge variant="neutral-outlined">{data.accessGroup?.name ?? '-'}</Badge>
    ),
  },
  {
    name: 'status',
    defaultFlex: 1,
    header: t('tables.connectedUsers.cells.status'),
    render: ({
      data,
    }: CellRender<User & { isVisible: boolean; accessGroup: AccessLevel }>) => (
      <Badge variant={status.getStatusVariant(data.status)}>
        {t(status.getFormattedStatusName(data.status))}
      </Badge>
    ),
  },
  {
    name: 'isVisible',
    defaultFlex: 1,
    header: t('tables.connectedUsers.cells.visible'),
    render: ({
      data,
    }: CellRender<User & { isVisible: boolean; accessGroup: AccessLevel }>) => (
      <Switch
        defaultChecked={data.isVisible}
        onChange={() => changeUserVisibility(data, !data.isVisible)}
      />
    ),
  },
  {
    name: 'action',
    header: t('common.remove'),
    width: 100,
    render: ({
      data,
    }: CellRender<User & { isVisible: boolean; accessGroup: AccessLevel }>) => (
      <Flex className={classes.cell} onClick={() => removeUser(data)}>
        <IconUserMinus className="icon" />
      </Flex>
    ),
  },
];

export default columns;
