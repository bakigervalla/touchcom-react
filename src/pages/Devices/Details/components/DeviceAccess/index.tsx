import { Button, Flex, Notification, Title } from '@mantine/core';
import { Form, Formik } from 'formik';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { device } from '@/data';

import Forms from '@/components/Forms';

import useStyles from './useStyles';
import validationSchema from './validationSchema';

const DeviceAccess = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { classes } = useStyles();
  const { changeDevicePassword } = device.actions();

  return (
    <Formik
      validationSchema={validationSchema(t)}
      onSubmit={(values, { resetForm }) => {
        changeDevicePassword(parseInt(id ?? '0', 10), values);
        resetForm();
      }}
      initialValues={{ oldPassword: '', newPassword: '', confirmPassword: '' }}
    >
      {({ touched, errors }) => (
        <Form className={classes.deviceAccessForm}>
          <Title order={4}>{t('forms.device.data.deviceAccess.title')}</Title>
          <Flex className={classes.inputContainer}>
            <Forms.TextField
              w="41%"
              id="oldPassword"
              name="oldPassword"
              inputLabel={t('forms.device.data.label.currentPassword')}
              placeholder={t('forms.device.data.placeholder.currentPassword')}
              type="password"
              maxLength={25}
              error={touched.oldPassword && errors.oldPassword}
            />
            <Notification withCloseButton={false} className={classes.infoBox}>
              {t('infoSection.emailFormat')}
            </Notification>
          </Flex>
          <Flex className={classes.inputContainer}>
            <Forms.TextField
              w="41%"
              id="newPassword"
              name="newPassword"
              inputLabel={t('forms.device.data.label.password')}
              placeholder={t('forms.device.data.placeholder.password')}
              type="password"
              maxLength={25}
              error={touched.newPassword && errors.newPassword}
            />
            <Notification withCloseButton={false} className={classes.infoBox}>
              {t('infoSection.passwordFormat')}
            </Notification>
          </Flex>
          <Flex className={classes.inputContainer}>
            <Forms.TextField
              w="41%"
              id="confirmPassword"
              name="confirmPassword"
              inputLabel={t('forms.device.data.label.confirmPassword')}
              placeholder={t('forms.device.data.placeholder.confirmPassword')}
              type="password"
              maxLength={25}
              error={touched.confirmPassword && errors.confirmPassword}
            />
            <Notification withCloseButton={false} className={classes.infoBox}>
              {t('infoSection.passwordsMustMatch')}
            </Notification>
          </Flex>
          <Button variant="action" type="submit" w="40%">
            {t('forms.device.data.saveButton')}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default memo(DeviceAccess);
