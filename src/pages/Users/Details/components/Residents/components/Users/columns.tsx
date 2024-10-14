import { Avatar, Badge, Flex, Text } from '@mantine/core';
import { IconQuestionMark, IconUserMinus } from '@tabler/icons-react';
import { TFunction } from 'i18next';
import { uniqBy as _uniqBy } from 'lodash';
import React from 'react';
import { NavigateFunction } from 'react-router-dom';

import { paths, placeholders } from '@/common/constants';
import { CellRender, KeyPair } from '@/common/interfaces';
import { AccessControl, User } from '@/common/models';
import { status } from '@/common/utils';

const columns = (
  navigate: NavigateFunction,
  classes: KeyPair<string>,
  t: TFunction,
  removeUser: (user: User) => void,
) => [
  {
    name: 'user',
    defaultFlex: 1,
    header: t('tables.connectedUsers.cells.user'),
    render: ({ data }: CellRender<User>) => (
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
    name: 'email',
    defaultFlex: 1,
    header: t('tables.users.cells.email'),
    render: ({ data }: CellRender<User>) => (
      <Text variant="subtitle">{data.email}</Text>
    ),
  },
  {
    name: 'accessLevels',
    defaultFlex: 1,
    header: t('tables.users.cells.accessLevels'),
    render: ({ data }: CellRender<User>) => {
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
  {
    name: 'status',
    defaultFlex: 1,
    header: t('tables.connectedUsers.cells.status'),
    render: ({ data }: CellRender<User>) => (
      <Badge variant={status.getStatusVariant(data.status)}>
        {t(status.getFormattedStatusName(data.status))}
      </Badge>
    ),
  },
  {
    name: 'action',
    header: t('common.remove'),
    width: 100,
    render: ({ data }: CellRender<User>) => (
      <Flex className={classes.cell} onClick={() => removeUser(data)}>
        <IconUserMinus className="icon" />
      </Flex>
    ),
  },
];

export default columns;
