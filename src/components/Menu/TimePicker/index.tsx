import { Button, Flex, Popover, Select, Text } from '@mantine/core';
import { Form, Formik } from 'formik';
import { padStart as _padStart } from 'lodash';
import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ArrowDownIcon, ClockIcon } from '@/icons';

import { TimePickerData } from '@/common/interfaces';

import useStyles from './useStyles';
import validationSchema from './validationSchema';

interface TimePickerProps {
  disabled?: boolean;
  handleSelect: (value: TimePickerData) => void;
}

const TimePicker = ({ disabled, handleSelect }: TimePickerProps) => {
  const { t } = useTranslation();
  const { classes } = useStyles();
  const [isTimePickerOpened, setIsTimePickerOpened] = useState(false);

  return (
    <Popover
      opened={isTimePickerOpened}
      shadow="xs"
      position="bottom-end"
      onChange={(opened) => setIsTimePickerOpened(opened)}
    >
      <Popover.Target>
        <Button
          ml="auto"
          variant="filter"
          disabled={disabled}
          leftIcon={<ClockIcon size={18} />}
          rightIcon={<ArrowDownIcon size={16} />}
          onClick={() => setIsTimePickerOpened((prev) => !prev)}
        >
          {t('common.timePicker.trigger')}
        </Button>
      </Popover.Target>
      <Popover.Dropdown className={classes.timePickerDropdownContainer}>
        <Text>{t('common.timePicker.title')}</Text>
        <Formik
          validationSchema={validationSchema(t)}
          onSubmit={(value: TimePickerData) => {
            handleSelect(value);
            setIsTimePickerOpened(false);
          }}
          initialValues={{
            timeFrom: '',
            timeTo: '',
          }}
        >
          {({ touched, errors, setFieldValue }) => (
            <Form className={classes.form}>
              <Flex gap={12} w="100%">
                <Select
                  id="timeFrom"
                  name="timeFrom"
                  rightSection={<ArrowDownIcon size={18} />}
                  placeholder="00:00"
                  data={Array(25)
                    .fill(0)
                    .map((_, hour) => ({
                      label: _padStart(`${hour}:00`, 5, '0'),
                      value: hour.toString(),
                    }))}
                  error={touched.timeFrom && errors.timeFrom}
                  onChange={(value) => void setFieldValue('timeFrom', value)}
                />
                <Select
                  id="timeTo"
                  name="timeTo"
                  rightSection={<ArrowDownIcon size={18} />}
                  placeholder="00:00"
                  data={Array(25)
                    .fill(0)
                    .map((_, hour) => ({
                      label: _padStart(`${hour}:00`, 5, '0'),
                      value: hour.toString(),
                    }))}
                  error={touched.timeTo && errors.timeTo}
                  onChange={(value) => void setFieldValue('timeTo', value)}
                />
              </Flex>
              <Button className={classes.button} type="submit">
                {t('common.apply')}
              </Button>
            </Form>
          )}
        </Formik>
      </Popover.Dropdown>
    </Popover>
  );
};

TimePicker.defaultProps = {
  disabled: false,
};

export default memo(TimePicker);
