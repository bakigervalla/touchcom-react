import { Button, Text, clsx } from '@mantine/core';
import { Form, Formik } from 'formik';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Forms } from '@/components';
import { auth } from '@/data';

import { paths } from '@/common/constants';

import useStyles from './useStyles';
import validationSchema from './validationSchema';

const RequestForm = () => {
  const { t } = useTranslation();
  const { classes } = useStyles();
  const { forgotPassword } = auth.actions();

  return (
    <Formik
      initialValues={{ email: '' }}
      onSubmit={forgotPassword}
      validationSchema={validationSchema(t)}
    >
      {({ touched, errors }) => (
        <Form className={classes.requestForm}>
          <Text className={classes.requestFormText}>
            {t('forms.passwordRecovery.request.data.title')}
          </Text>
          <Text className={clsx(classes.subtitle, 'main')}>
            {t('forms.passwordRecovery.request.data.subtitle')}
          </Text>
          <Forms.TextField
            inputLabel={t('forms.passwordRecovery.request.data.label.email')}
            placeholder={t(
              'forms.passwordRecovery.request.data.placeholder.email',
            )}
            id="email"
            name="email"
            maxLength={40}
            trim
            error={touched.email && errors.email}
          />
          <Button variant="filled" type="submit">
            {t('forms.passwordRecovery.request.data.submitButton')}
          </Button>
          <Text variant="caption" className={classes.subtitle}>
            {t('forms.passwordRecovery.alreadyHaveAccount')}
            <Link to={paths.LOGIN} className="link">
              {` ${t('forms.passwordRecovery.signInLink')}`}
            </Link>
          </Text>
        </Form>
      )}
    </Formik>
  );
};

export default memo(RequestForm);
