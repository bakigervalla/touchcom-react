import { Flex, Notification } from '@mantine/core';
import { Form, Formik, getIn } from 'formik';
import React, { memo, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import Forms from '@/components/Forms';

import { WizardComponentProps } from '@/common/interfaces';
import { CreateDevice } from '@/common/models';

import useStyles from './useStyles';
import validationSchema from './validationSchema';

interface DeviceFormProps {
  wizardProps: WizardComponentProps<CreateDevice>;
}

const DeviceForm = ({ ...wizardProps }: DeviceFormProps) => {
  const formRef = useRef<any>();
  const { t } = useTranslation();
  const { classes } = useStyles();

  useEffect(() => {
    wizardProps.wizardProps.setStepRef(formRef);
  }, [wizardProps]);

  return (
    <Formik
      innerRef={formRef}
      validationSchema={validationSchema(t)}
      onSubmit={wizardProps.wizardProps.setWizardState}
      initialValues={wizardProps.wizardProps.wizardState}
    >
      {({ touched, errors }) => (
        <Form className={classes.credentialsForm}>
          <Flex className={classes.inputContainer}>
            <Forms.TextField
              w="60%"
              inputLabel={t('forms.device.data.label.email')}
              placeholder={t('forms.device.data.placeholder.email')}
              id="credentials.email"
              name="credentials.email"
              maxLength={25}
              error={
                touched.credentials &&
                (getIn(errors, 'credentials.email') as string)
              }
            />
            <Notification withCloseButton={false} className={classes.infoBox}>
              {t('infoSection.emailFormat')}
            </Notification>
          </Flex>
          <Flex className={classes.inputContainer}>
            <Forms.TextField
              w="60%"
              inputLabel={t('forms.device.data.label.password')}
              placeholder={t('forms.device.data.placeholder.password')}
              type="password"
              id="credentials.password"
              name="credentials.password"
              maxLength={25}
              error={
                touched.credentials &&
                (getIn(errors, 'credentials.password') as string)
              }
            />
            <Notification withCloseButton={false} className={classes.infoBox}>
              {t('infoSection.passwordFormat')}
            </Notification>
          </Flex>
          <Flex className={classes.inputContainer}>
            <Forms.TextField
              w="60%"
              inputLabel={t('forms.device.data.label.confirmPassword')}
              placeholder={t('forms.device.data.placeholder.confirmPassword')}
              type="password"
              id="credentials.confirmPassword"
              name="credentials.confirmPassword"
              maxLength={25}
              error={
                touched.credentials &&
                (getIn(errors, 'credentials.confirmPassword') as string)
              }
            />
            <Notification withCloseButton={false} className={classes.infoBox}>
              {t('infoSection.passwordsMustMatch')}
            </Notification>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

export default memo(DeviceForm);
