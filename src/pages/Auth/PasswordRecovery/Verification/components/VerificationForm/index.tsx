import { Button, Text } from '@mantine/core';
import { Form, Formik } from 'formik';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { Forms } from '@/components';
import { auth } from '@/data';

import { paths } from '@/common/constants';

import useStyles from './useStyles';
import validationSchema from './validationSchema';

const VerificationForm = () => {
  const { t } = useTranslation();
  const { classes } = useStyles();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const token = searchParams.get('token');
  const { resetPassword } = auth.actions();

  return (
    <Formik
      initialValues={{ passwordResetToken: token, password: '' }}
      onSubmit={resetPassword}
      validationSchema={validationSchema(t)}
    >
      {({ touched, errors }) => (
        <Form className={classes.verificationForm}>
          <Text className={classes.verificationFormText}>
            {t('forms.passwordRecovery.verification.data.title')}
          </Text>
          <Forms.TextField
            inputLabel={t(
              'forms.passwordRecovery.verification.data.label.passwordResetToken',
            )}
            placeholder={t(
              'forms.passwordRecovery.verification.data.placeholder.passwordResetToken',
            )}
            id="passwordResetToken"
            name="passwordResetToken"
            maxLength={40}
            trim
            error={touched.passwordResetToken && errors.passwordResetToken}
          />
          <Forms.TextField
            inputLabel={t(
              'forms.passwordRecovery.verification.data.label.password',
            )}
            placeholder={t(
              'forms.passwordRecovery.verification.data.placeholder.password',
            )}
            type="password"
            id="password"
            name="password"
            maxLength={25}
            error={touched.password && errors.password}
          />
          <Button variant="filled" type="submit">
            {t('forms.passwordRecovery.verification.data.submitButton')}
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

export default memo(VerificationForm);
