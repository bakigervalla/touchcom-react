import { Flex, Switch, Text } from '@mantine/core';
import { omit as _omit } from 'lodash';
import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import Loaders from '@/components/Loaders';
import Menu from '@/components/Menu';

import { KeyPair, TimePickerData } from '@/common/interfaces';
import {
  AccessKey,
  AccessLevel,
  AccessTimeSchedule,
  Day,
  TimeScheduleAccessTime,
} from '@/common/models';

import { SelectedTime } from './components';
import useStyles from './useStyles';

interface TimeSchedulesProps {
  disabled: boolean;
  isDataLoading: boolean;
  data: Partial<AccessLevel | AccessKey> | null;
  upsertData: (dataId: number, data: Partial<AccessTimeSchedule>) => void;
  removeAccessTime: (
    dataId: number,
    timeScheduleId: number,
    accessTimeId: number,
  ) => void;
}

const TimeSchedules = ({
  data,
  disabled,
  isDataLoading,
  upsertData,
  removeAccessTime,
}: TimeSchedulesProps) => {
  const { t } = useTranslation();
  const { classes } = useStyles();

  const enableAccess = useCallback(
    (dayText: string) => {
      const applyEveryDay = Object.keys(data?.accessTimeSchedule ?? [])
        .filter(
          (accessKey) =>
            accessKey.includes('apply') && !accessKey.includes('applyEveryDay'),
        )
        .every((accessKey) =>
          accessKey === dayText
            ? !(data?.accessTimeSchedule as KeyPair<any>)[dayText]
            : (data?.accessTimeSchedule as KeyPair<any>)[accessKey],
        );

      upsertData(data?.id ?? 0, {
        ..._omit(data?.accessTimeSchedule, 'accessTimes'),
        [dayText]: !(data?.accessTimeSchedule as KeyPair<any>)[dayText],
        applyEveryDay,
      });
    },
    [data, upsertData],
  );

  const handleRemoveAccessTime = useCallback(
    (timeScheduleAccessTime: TimeScheduleAccessTime) =>
      removeAccessTime(
        data?.id ?? 0,
        timeScheduleAccessTime.timeScheduleId,
        timeScheduleAccessTime.accessTimeId,
      ),
    [data, removeAccessTime],
  );

  const handleAddAccessTime = useCallback(
    (timePickerData: TimePickerData & { day: Day }) => {
      upsertData(data?.id ?? 0, {
        ..._omit(data?.accessTimeSchedule, 'accessTimes'),
        accessTimes: [
          {
            ...(data?.accessTimeSchedule
              ? { timeScheduleId: data?.accessTimeSchedule?.id ?? 0 }
              : {}),
            accessTime: {
              accessStartsAt: timePickerData.timeFrom,
              accessEndsAt: timePickerData.timeTo,
            },
            day: timePickerData.day,
          } as TimeScheduleAccessTime,
        ],
      });
    },
    [data, upsertData],
  );

  if (isDataLoading) {
    return (
      <Flex pos="relative" h="100%">
        <Loaders.Overlay />
      </Flex>
    );
  }

  return (
    <Flex className={classes.timeSchedulesContainer}>
      <Flex className={classes.scheduleItem}>
        <Text>{t('page.accessLevels.timeSchedule.applyEveryDay')}</Text>
        <Switch
          disabled={disabled}
          checked={data?.accessTimeSchedule?.applyEveryDay ?? false}
          onChange={() =>
            upsertData(data?.id ?? 0, {
              ..._omit(data?.accessTimeSchedule, 'accessTimes'),
              applyEveryDay: !data?.accessTimeSchedule?.applyEveryDay,
              applyWholeMonday: !data?.accessTimeSchedule?.applyEveryDay,
              applyWholeTuesday: !data?.accessTimeSchedule?.applyEveryDay,
              applyWholeWednesday: !data?.accessTimeSchedule?.applyEveryDay,
              applyWholeThursday: !data?.accessTimeSchedule?.applyEveryDay,
              applyWholeFriday: !data?.accessTimeSchedule?.applyEveryDay,
              applyWholeSaturday: !data?.accessTimeSchedule?.applyEveryDay,
              applyWholeSunday: !data?.accessTimeSchedule?.applyEveryDay,
            })
          }
        />
      </Flex>
      <Flex className={classes.scheduleItem}>
        <Text>{t('page.accessLevels.timeSchedule.monday')}</Text>
        <Switch
          disabled={disabled}
          checked={data?.accessTimeSchedule?.applyWholeMonday ?? false}
          onChange={() => enableAccess('applyWholeMonday')}
        />
        <Menu.TimePicker
          handleSelect={(data) =>
            handleAddAccessTime({ ...data, day: Day.MONDAY })
          }
          disabled={disabled}
        />
      </Flex>
      <SelectedTime
        timeScheduleAccessTimes={data?.accessTimeSchedule?.accessTimes ?? []}
        day={Day.MONDAY}
        handleRemove={handleRemoveAccessTime}
      />
      <Flex className={classes.scheduleItem}>
        <Text>{t('page.accessLevels.timeSchedule.tuesday')}</Text>
        <Switch
          disabled={disabled}
          checked={data?.accessTimeSchedule?.applyWholeTuesday ?? false}
          onChange={() => enableAccess('applyWholeTuesday')}
        />
        <Menu.TimePicker
          handleSelect={(data) =>
            handleAddAccessTime({ ...data, day: Day.TUESDAY })
          }
          disabled={disabled}
        />
      </Flex>
      <SelectedTime
        timeScheduleAccessTimes={data?.accessTimeSchedule?.accessTimes ?? []}
        day={Day.TUESDAY}
        handleRemove={handleRemoveAccessTime}
      />
      <Flex className={classes.scheduleItem}>
        <Text>{t('page.accessLevels.timeSchedule.wednesday')}</Text>
        <Switch
          disabled={disabled}
          checked={data?.accessTimeSchedule?.applyWholeWednesday ?? false}
          onChange={() => enableAccess('applyWholeWednesday')}
        />
        <Menu.TimePicker
          handleSelect={(data) =>
            handleAddAccessTime({ ...data, day: Day.WEDNESDAY })
          }
          disabled={disabled}
        />
      </Flex>
      <SelectedTime
        timeScheduleAccessTimes={data?.accessTimeSchedule?.accessTimes ?? []}
        day={Day.WEDNESDAY}
        handleRemove={handleRemoveAccessTime}
      />
      <Flex className={classes.scheduleItem}>
        <Text>{t('page.accessLevels.timeSchedule.thursday')}</Text>
        <Switch
          disabled={disabled}
          checked={data?.accessTimeSchedule?.applyWholeThursday ?? false}
          onChange={() => enableAccess('applyWholeThursday')}
        />
        <Menu.TimePicker
          handleSelect={(data) =>
            handleAddAccessTime({ ...data, day: Day.THURSDAY })
          }
          disabled={disabled}
        />
      </Flex>
      <SelectedTime
        timeScheduleAccessTimes={data?.accessTimeSchedule?.accessTimes ?? []}
        day={Day.THURSDAY}
        handleRemove={handleRemoveAccessTime}
      />
      <Flex className={classes.scheduleItem}>
        <Text>{t('page.accessLevels.timeSchedule.friday')}</Text>
        <Switch
          disabled={disabled}
          checked={data?.accessTimeSchedule?.applyWholeFriday ?? false}
          onChange={() => enableAccess('applyWholeFriday')}
        />
        <Menu.TimePicker
          handleSelect={(data) =>
            handleAddAccessTime({ ...data, day: Day.FRIDAY })
          }
          disabled={disabled}
        />
      </Flex>
      <SelectedTime
        timeScheduleAccessTimes={data?.accessTimeSchedule?.accessTimes ?? []}
        day={Day.FRIDAY}
        handleRemove={handleRemoveAccessTime}
      />
      <Flex className={classes.scheduleItem}>
        <Text>{t('page.accessLevels.timeSchedule.saturday')}</Text>
        <Switch
          disabled={disabled}
          checked={data?.accessTimeSchedule?.applyWholeSaturday ?? false}
          onChange={() => enableAccess('applyWholeSaturday')}
        />
        <Menu.TimePicker
          handleSelect={(data) =>
            handleAddAccessTime({ ...data, day: Day.SATURDAY })
          }
          disabled={disabled}
        />
      </Flex>
      <SelectedTime
        timeScheduleAccessTimes={data?.accessTimeSchedule?.accessTimes ?? []}
        day={Day.SATURDAY}
        handleRemove={handleRemoveAccessTime}
      />
      <Flex className={classes.scheduleItem}>
        <Text>{t('page.accessLevels.timeSchedule.sunday')}</Text>
        <Switch
          disabled={disabled}
          checked={data?.accessTimeSchedule?.applyWholeSunday ?? false}
          onChange={() => enableAccess('applyWholeSunday')}
        />
        <Menu.TimePicker
          handleSelect={(data) =>
            handleAddAccessTime({ ...data, day: Day.SUNDAY })
          }
          disabled={disabled}
        />
      </Flex>
      <SelectedTime
        timeScheduleAccessTimes={data?.accessTimeSchedule?.accessTimes ?? []}
        day={Day.SUNDAY}
        handleRemove={handleRemoveAccessTime}
      />
    </Flex>
  );
};

export default memo(TimeSchedules);
