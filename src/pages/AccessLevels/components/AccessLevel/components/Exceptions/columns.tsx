import { Badge, Text } from '@mantine/core';
import { TFunction } from 'i18next';
import moment from 'moment';
import React from 'react';

import { DotsIcon } from '@/icons';

import { CellRender, KeyPair } from '@/common/interfaces';
import { AccessException, AccessLevelAccessException } from '@/common/models';
import { common, status } from '@/common/utils';

const columns = (
  classes: KeyPair<string>,
  t: TFunction,
  handleInfoClick: (data: AccessException) => void,
) => [
  {
    name: 'name',
    defaultFlex: 1,
    header: t('tables.accessLevelExceptions.cells.name'),
    render: ({ data }: CellRender<AccessLevelAccessException>) => (
      <Badge variant="neutral-outlined">{data.accessException.name}</Badge>
    ),
  },
  {
    name: 'status',
    header: t('tables.accessLevelExceptions.cells.status'),
    render: ({ data }: CellRender<AccessLevelAccessException>) => (
      <Badge variant={status.getStatusVariant(data.accessException.lockStatus)}>
        {t(status.getFormattedStatusName(data.accessException.lockStatus))}
      </Badge>
    ),
  },
  {
    name: 'date',
    defaultFlex: 1,
    header: t('tables.accessLevelExceptions.cells.date'),
    render: ({ data }: CellRender<AccessLevelAccessException>) => {
      let { startTime } = data.accessException;
      let { endTime } = data.accessException;
      if (data.accessException.applyWholeDay) {
        startTime = '00:00';
        endTime = '00:00';
      }

      if (data.accessException.applySingleDate) {
        return (
          <Text variant="subtitle">
            {moment(data.accessException.startDate).format('DD/MM/YYYY')}{' '}
            {common.getFormattedTime(startTime as string)}
          </Text>
        );
      }

      return (
        <Text variant="subtitle">
          {moment(data.accessException.startDate).format('DD/MM/YYYY')}{' '}
          {common.getFormattedTime(startTime as string)} -{' '}
          {moment(data.accessException.endDate).format('DD/MM/YYYY')}{' '}
          {common.getFormattedTime(endTime as string)}
        </Text>
      );
    },
  },
  {
    name: 'action',
    header: '',
    render: ({ data }: { data: AccessLevelAccessException }) => (
      <DotsIcon
        className={classes.actionIcon}
        onClick={() => handleInfoClick(data.accessException)}
      />
    ),
  },
];

export default columns;
