import {
  Button,
  Checkbox,
  Flex,
  Group,
  Radio,
  Select,
  Switch,
  Text,
} from '@mantine/core';
import { DateInput, DateValue } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { padStart as _padStart } from 'lodash';
import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { ConfirmationDialog, InlineEdit } from '@/components';
import { accessLevel } from '@/data';
import { ArrowDownIcon } from '@/icons';

import { AccessException, LockStatus } from '@/common/models';
import { status as statusUtils } from '@/common/utils';

import useStyles from './useStyles';

interface DetailsProps {
  accessLevelId: number | undefined;
  data: AccessException;
  closeEditDialog: () => void;
  handleUpdate: (values: Partial<AccessException>) => void;
}

const Details = ({
  accessLevelId,
  closeEditDialog,
  data,
  handleUpdate,
}: DetailsProps) => {
  const { t } = useTranslation();
  const { classes } = useStyles();
  const [opened, { toggle, close }] = useDisclosure(false);
  const { removeException } = accessLevel.actions();

  const handleRemoveAccessLevelException = useCallback(() => {
    close();
    closeEditDialog();
    removeException(accessLevelId ?? 0, data.id);
  }, [accessLevelId, close, closeEditDialog, data, removeException]);

  return (
    <Flex className={classes.detailsContainer}>
      <Flex direction="column" gap={4}>
        <Text className="label">{t('forms.exception.data.label.name')}</Text>
        <InlineEdit.Input
          value={data.name}
          onSetValue={(value) => handleUpdate({ ...data, name: value })}
          classNames={{ text: 'text' }}
        />
      </Flex>
      <Radio.Group
        name="status"
        label={t('forms.exception.data.label.status')}
        defaultValue={data.lockStatus}
        onChange={(value: LockStatus) =>
          handleUpdate({ ...data, lockStatus: value })
        }
      >
        <Group mt="xs">
          {Object.values(LockStatus).map((status: string) => (
            <Radio
              key={status}
              value={status}
              label={t(statusUtils.getFormattedStatusName(status))}
            />
          ))}
        </Group>
      </Radio.Group>
      <Flex direction="column" gap={12}>
        <Flex align="center">
          <Text className="label">
            {t('forms.exception.data.label.period')}
          </Text>
          <Flex ml="auto" gap={16}>
            <Text className="label">
              {t('forms.exception.data.label.periodOneDay')}
            </Text>
            <Switch
              defaultChecked={data.applySingleDate}
              onChange={() =>
                handleUpdate({
                  ...data,
                  applySingleDate: !data.applySingleDate,
                })
              }
            />
          </Flex>
        </Flex>
        <Flex align="center" gap={10}>
          <DateInput
            w="50%"
            popoverProps={{
              withinPortal: true,
              position: 'bottom-start',
            }}
            dateParser={(input: string) => new Date(input)}
            valueFormat="MM/DD/YYYY"
            placeholder="23/12/2023"
            clearable
            value={new Date(data.startDate)}
            onChange={(value: DateValue) =>
              value
                ? handleUpdate({
                    ...data,
                    startDate: value,
                  })
                : null
            }
          />
          {!data.applySingleDate && (
            <>
              <Text variant="subtitle">{t('to')}</Text>
              <DateInput
                w="50%"
                popoverProps={{
                  withinPortal: true,
                  position: 'bottom-start',
                }}
                dateParser={(input: string) => new Date(input)}
                valueFormat="MM/DD/YYYY"
                placeholder="23/12/2023"
                clearable
                value={new Date(data?.endDate ?? '')}
                onChange={(value: DateValue) =>
                  value
                    ? handleUpdate({
                        ...data,
                        endDate: value,
                      })
                    : null
                }
              />
            </>
          )}
        </Flex>
      </Flex>
      <Flex direction="column" gap={12}>
        <Flex align="center">
          <Text className="label">
            {t('forms.exception.data.label.timeInterval')}
          </Text>
          <Flex ml="auto" gap={16}>
            <Text className="label">
              {t('forms.exception.data.label.timeWholeDay')}
            </Text>
            <Switch
              defaultChecked={data.applyWholeDay}
              onChange={() =>
                handleUpdate({
                  ...data,
                  applyWholeDay: !data.applyWholeDay,
                })
              }
            />
          </Flex>
        </Flex>
        {!data.applyWholeDay && (
          <Flex align="center" gap={10}>
            <Select
              w="50%"
              defaultValue={data.startTime}
              rightSection={<ArrowDownIcon size={18} />}
              placeholder="00:00"
              data={Array(25)
                .fill(0)
                .map((_, hour) => ({
                  label: _padStart(`${hour}:00`, 5, '0'),
                  value: hour.toString(),
                }))}
              onChange={(value) =>
                handleUpdate({
                  ...data,
                  startTime: value as string,
                })
              }
            />
            <Text variant="subtitle">{t('to')}</Text>
            <Select
              defaultValue={data.endTime}
              rightSection={<ArrowDownIcon size={18} />}
              placeholder="00:00"
              data={Array(25)
                .fill(0)
                .map((_, hour) => ({
                  label: _padStart(`${hour}:00`, 5, '0'),
                  value: hour.toString(),
                }))}
              onChange={(value) =>
                handleUpdate({
                  ...data,
                  endTime: value as string,
                })
              }
            />
          </Flex>
        )}
        <Flex className={classes.buttonsContainer}>
          <Checkbox
            label={t('forms.exception.data.label.saveForNextYear')}
            labelPosition="left"
            mr="auto"
            checked={data.applyForNextYear}
            onChange={() =>
              handleUpdate({
                ...data,
                applyForNextYear: !data.applyForNextYear,
              })
            }
          />
          <Button variant="neutral" onClick={toggle}>
            {t('buttons.deleteException')}
          </Button>
        </Flex>
      </Flex>
      <ConfirmationDialog
        isOpened={opened}
        positiveButtonText={t('common.confirm')}
        negativeButtonText={t('common.cancel')}
        text={t('dialogs.accessLevels.deleteException.confirmationText')}
        title={t('dialogs.accessLevels.deleteException.confirmationTitle')}
        negativeButtonClick={close}
        positiveButtonClick={handleRemoveAccessLevelException}
      />
    </Flex>
  );
};

export default memo(Details);
