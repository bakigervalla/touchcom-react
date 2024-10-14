import { Badge, Flex } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import React, { memo } from 'react';
import { Trans } from 'react-i18next';

import { Day, TimeScheduleAccessTime } from '@/common/models';
import { common } from '@/common/utils';

import useStyles from './useStyles';

interface SelectedTimeProps {
  day: Day;
  timeScheduleAccessTimes: TimeScheduleAccessTime[];
  handleRemove: (timeScheduleAccessTime: TimeScheduleAccessTime) => void;
}

const SelectedTime = ({
  day,
  timeScheduleAccessTimes,
  handleRemove,
}: SelectedTimeProps) => {
  const { classes } = useStyles();

  return (
    <Flex className={classes.timeSelectionContainer}>
      {timeScheduleAccessTimes
        .filter((timeScheduleAccessTime) => timeScheduleAccessTime.day === day)
        .sort(
          (a, b) =>
            parseInt(a.accessTime.accessStartsAt, 10) -
            parseInt(b.accessTime.accessStartsAt, 10),
        )
        .map((timeScheduleAccessTime) => (
          <Badge
            key={timeScheduleAccessTime.id}
            variant="filter"
            rightSection={
              <IconX
                size={16}
                onClick={() => handleRemove(timeScheduleAccessTime)}
              />
            }
          >
            <Trans
              i18nKey="page.accessLevels.timeSchedule.selectedTime"
              values={{
                from: common.getFormattedTime(
                  timeScheduleAccessTime.accessTime.accessStartsAt,
                ),
                to: common.getFormattedTime(
                  timeScheduleAccessTime.accessTime.accessEndsAt,
                ),
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
              </span>
            </Trans>
          </Badge>
        ))}
    </Flex>
  );
};

export default memo(SelectedTime);
