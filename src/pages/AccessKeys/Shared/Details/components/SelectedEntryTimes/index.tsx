import { Badge, Flex } from '@mantine/core';
import React, { memo } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { TimeScheduleAccessTime } from '@/common/models';
import { common } from '@/common/utils';

import useStyles from './useStyles';

interface SelectedEntryTimesProps {
  timeScheduleAccessTimes: TimeScheduleAccessTime[];
  onMoreClick: () => void;
}

const SelectedEntryTimes = ({
  timeScheduleAccessTimes,
  onMoreClick,
}: SelectedEntryTimesProps) => {
  const { t } = useTranslation();
  const { classes } = useStyles();

  return (
    <Flex className={classes.timeSelectionContainer}>
      {timeScheduleAccessTimes.slice(0, 3).map((timeScheduleAccessTime) => (
        <Badge key={timeScheduleAccessTime.id} variant="filter">
          <Trans
            i18nKey="page.accessLevels.timeSchedule.selectedTimeOnDay"
            values={{
              from: common.getFormattedTime(
                timeScheduleAccessTime.accessTime.accessStartsAt,
              ),
              to: common.getFormattedTime(
                timeScheduleAccessTime.accessTime.accessEndsAt,
              ),
              on: t(common.getFormattedDay(timeScheduleAccessTime.day)),
            }}
          >
            From{' '}
            <span className="highlighted">
              {common.getFormattedTime(
                timeScheduleAccessTime.accessTime.accessStartsAt,
              )}
            </span>{' '}
            To{' '}
            <span className="highlighted">
              {common.getFormattedTime(
                timeScheduleAccessTime.accessTime.accessEndsAt,
              )}
            </span>{' '}
            On{' '}
            <span className="highlighted">
              {t(common.getFormattedDay(timeScheduleAccessTime.day))}
            </span>
          </Trans>
        </Badge>
      ))}
      {timeScheduleAccessTimes.length > 3 && (
        <Badge
          variant="neutral-outlined"
          onClick={onMoreClick}
          className={classes.moreButton}
        >
          +{timeScheduleAccessTimes.length - 3}
        </Badge>
      )}
    </Flex>
  );
};

export default memo(SelectedEntryTimes);
