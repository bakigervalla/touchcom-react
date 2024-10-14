import { Badge, Switch } from '@mantine/core';
import { TFunction } from 'i18next';
import moment from 'moment';
import React from 'react';

import { EntityInfo } from '@/components';
import { DotsIcon } from '@/icons';

import { placeholders } from '@/common/constants';
import { AccessKeyFilter, CellRender, KeyPair } from '@/common/interfaces';
import {
  AccessKey,
  AccessKeyStatus,
  UpsertAccessKey,
  User,
} from '@/common/models';
import { common } from '@/common/utils';

const columns = (
  handleInfoClick: (data: AccessKey) => void,
  handleUpdate: (data: UpsertAccessKey, filters: AccessKeyFilter) => void,
  filters: AccessKeyFilter,
  classes: KeyPair<string>,
  t: TFunction,
) => [
  {
    name: 'name',
    defaultFlex: 1,
    header: t('tables.accessKeys.cells.name'),
    render: ({ data }: CellRender<AccessKey>) => (
      <Badge variant="neutral-outlined">
        {data.name} {data.number ? `#${data.number}` : ''}
      </Badge>
    ),
  },
  {
    name: 'status',
    defaultFlex: 1,
    header: t('tables.accessKeys.cells.status'),
    render: ({ data }: CellRender<AccessKey>) => (
      <Switch
        checked={data.status === AccessKeyStatus.ACTIVE}
        onChange={() =>
          handleUpdate(
            {
              ...data,
              status:
                data.status === AccessKeyStatus.ACTIVE
                  ? AccessKeyStatus.INACTIVE
                  : AccessKeyStatus.ACTIVE,
            },
            filters,
          )
        }
      />
    ),
  },
  {
    name: 'belongsTo',
    defaultFlex: 1,
    header: t('tables.accessKeys.cells.belongsTo'),
    render: ({ data }: CellRender<AccessKey>) => (
      <EntityInfo
        onClick={() => null}
        data={
          data.accessControl && data.accessControl.user
            ? {
                id: data.id,
                imageUrl:
                  data.accessControl.user?.imageUrl ||
                  `${placeholders.IMAGE_PLACEHOLDERS_URL}/${placeholders.USER_PLACEHOLDER.USER_A}`,
                title:
                  common.getUserFullName(data.accessControl.user as User) ??
                  '-',
                subtitle: data.validFrom
                  ? `${moment(data.validFrom).format('DD/MM/YYYY')} - ${moment(
                      data.validTo,
                    ).format('DD/MM/YYYY')}`
                  : 'N/A',
              }
            : null
        }
      />
    ),
  },
  {
    name: 'action',
    header: '',
    render: ({ data }: { data: AccessKey }) => (
      <DotsIcon
        className={classes.actionIcon}
        onClick={() => handleInfoClick(data)}
      />
    ),
  },
];

export default columns;
