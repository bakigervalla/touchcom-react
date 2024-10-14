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
import { Form, Formik } from 'formik';
import { padStart as _padStart } from 'lodash';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArrowDownIcon } from '@/icons';

import Forms from '@/components/Forms';

import { AccessException, LockStatus } from '@/common/models';
import { status as statusUtils } from '@/common/utils';

import useStyles from './useStyles';
import validationSchema from './validationSchema';

interface ExceptionFormProps {
  onCancel: () => void;
  handleSubmit: (values: Partial<AccessException>) => void;
}

const ExceptionForm = ({ handleSubmit, onCancel }: ExceptionFormProps) => {
  const { t } = useTranslation();
  const { classes } = useStyles();

  return (
    <Formik
      validationSchema={validationSchema(t)}
      onSubmit={handleSubmit}
      initialValues={{
        name: '',
        startDate: new Date(),
        endDate: new Date(),
        startTime: '',
        endTime: '',
        applySingleDate: false,
        applyWholeDay: false,
        applyForNextYear: false,
        lockStatus: LockStatus.OPEN,
      }}
    >
      {({ touched, errors, setFieldValue, values }) => (
        <Form className={classes.exceptionForm}>
          <Forms.TextField
            inputLabel={t('forms.exception.data.label.name')}
            placeholder={t('forms.exception.data.placeholder.name')}
            id="name"
            name="name"
            withAsterisk
            maxLength={40}
            error={touched.name && errors.name}
          />
          <Radio.Group
            name="lockStatus"
            label={t('forms.exception.data.label.status')}
            defaultValue={LockStatus.OPEN}
            onChange={(value: string) => {
              void setFieldValue('lockStatus', value);
            }}
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
              <Text className={classes.label}>
                {t('forms.exception.data.label.period')}
              </Text>
              <Flex ml="auto" gap={16}>
                <Text className={classes.label}>
                  {t('forms.exception.data.label.periodOneDay')}
                </Text>
                <Switch
                  onChange={() =>
                    void setFieldValue(
                      'applySingleDate',
                      !values.applySingleDate,
                    )
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
                onChange={(value: DateValue) =>
                  value ? void setFieldValue('startDate', value) : null
                }
              />
              {!values.applySingleDate && (
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
                    onChange={(value: DateValue) =>
                      value ? void setFieldValue('endDate', value) : null
                    }
                  />
                </>
              )}
            </Flex>
          </Flex>
          <Flex direction="column" gap={12}>
            <Flex align="center">
              <Text className={classes.label}>
                {t('forms.exception.data.label.timeInterval')}
              </Text>
              <Flex ml="auto" gap={16}>
                <Text className={classes.label}>
                  {t('forms.exception.data.label.timeWholeDay')}
                </Text>
                <Switch
                  onChange={() =>
                    void setFieldValue('applyWholeDay', !values.applyWholeDay)
                  }
                />
              </Flex>
            </Flex>
            {!values.applyWholeDay && (
              <Flex align="center" gap={10}>
                <Select
                  w="50%"
                  id="startTime"
                  name="startTime"
                  rightSection={<ArrowDownIcon size={18} />}
                  placeholder="00:00"
                  data={Array(25)
                    .fill(0)
                    .map((_, hour) => ({
                      label: _padStart(`${hour}:00`, 5, '0'),
                      value: hour.toString(),
                    }))}
                  onChange={(value: string) => {
                    void setFieldValue('startTime', value);
                  }}
                  error={touched.startTime && errors.startTime}
                />
                <Text variant="subtitle">{t('to')}</Text>
                <Select
                  w="50%"
                  id="endTime"
                  name="endTime"
                  rightSection={<ArrowDownIcon size={18} />}
                  placeholder="00:00"
                  data={Array(25)
                    .fill(0)
                    .map((_, hour) => ({
                      label: _padStart(`${hour}:00`, 5, '0'),
                      value: hour.toString(),
                    }))}
                  onChange={(value: string) => {
                    void setFieldValue('endTime', value);
                  }}
                  error={touched.endTime && errors.endTime}
                />
              </Flex>
            )}
            <Flex className={classes.buttonsContainer}>
              <Checkbox
                label={t('forms.exception.data.label.saveForNextYear')}
                labelPosition="left"
                mr="auto"
                onChange={() =>
                  void setFieldValue(
                    'applyForNextYear',
                    !values.applyForNextYear,
                  )
                }
              />
              <Button variant="neutral" onClick={onCancel}>
                {t('common.cancel')}
              </Button>
              <Button
                type="submit"
                variant="filled"
                className={classes.submitButton}
              >
                {t('common.submit')}
              </Button>
            </Flex>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

export default memo(ExceptionForm);
