import { Flex, Notification } from '@mantine/core';
import { Form, Formik } from 'formik';
import React, { memo, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import Forms from '@/components/Forms';

import { WizardComponentProps } from '@/common/interfaces';
import { CreateUser } from '@/common/models';

import useStyles from './useStyles';
import validationSchema from './validationSchema';

interface UserFormProps {
  wizardProps: WizardComponentProps<CreateUser>;
}

const UserForm = ({ ...wizardProps }: UserFormProps) => {
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
              inputLabel={t('forms.user.data.label.password')}
              placeholder={t('forms.user.data.placeholder.password')}
              type="password"
              id="password"
              name="password"
              maxLength={25}
              error={touched.password && errors.password}
            />
            <Notification withCloseButton={false} className={classes.infoBox}>
              {t('infoSection.passwordFormat')}
            </Notification>
          </Flex>
          <Flex className={classes.inputContainer}>
            <Forms.TextField
              w="60%"
              inputLabel={t('forms.user.data.label.confirmPassword')}
              placeholder={t('forms.user.data.placeholder.confirmPassword')}
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              maxLength={25}
              error={touched.confirmPassword && errors.confirmPassword}
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

export default memo(UserForm);
