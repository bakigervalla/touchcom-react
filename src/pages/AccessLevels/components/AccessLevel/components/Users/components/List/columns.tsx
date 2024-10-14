import { Badge } from '@mantine/core';
import { TFunction } from 'i18next';
import React from 'react';
import { NavigateFunction } from 'react-router-dom';

import { EntityInfo } from '@/components';
import { RemoveUserIcon } from '@/icons';

import { paths, placeholders } from '@/common/constants';
import { CellRender, KeyPair } from '@/common/interfaces';
import { User } from '@/common/models';
import { common, status } from '@/common/utils';

const columns = (
  classes: KeyPair<string>,
  t: TFunction,
  navigate: NavigateFunction,
  detachUser: (user: User) => void,
) => [
  {
    name: 'name',
    defaultFlex: 1,
    header: t('tables.users.cells.name'),
    render: ({ data }: CellRender<User>) => (
      <EntityInfo
        onClick={() =>
          navigate(paths.build(paths.SITES_USERS_ID, data.id?.toString() ?? ''))
        }
        data={{
          id: data.id,
          imageUrl:
            data.imageUrl ||
            `${placeholders.IMAGE_PLACEHOLDERS_URL}/${placeholders.USER_PLACEHOLDER.USER_A}`,
          title: common.getUserFullName(data) ?? '-',
        }}
      />
    ),
  },
  {
    name: 'role',
    defaultFlex: 1,
    header: t('tables.users.cells.role'),
    render: ({ data }: CellRender<User>) => data.role.name,
  },
  {
    name: 'status',
    defaultFlex: 1,
    header: t('tables.users.cells.status'),
    render: ({ data }: CellRender<User>) => (
      <Badge variant={status.getStatusVariant(data.status ?? '')}>
        {t(status.getFormattedStatusName(data.status ?? ''))}
      </Badge>
    ),
  },
  {
    name: 'action',
    header: '',
    render: ({ data }: CellRender<User>) => (
      <RemoveUserIcon
        className={classes.actionIcon}
        onClick={() => detachUser(data)}
      />
    ),
  },
];

export default columns;
