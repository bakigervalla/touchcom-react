import { Button, Text } from '@mantine/core';
import { Form, Formik } from 'formik';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Forms } from '@/components';
import { auth } from '@/data';

import { paths } from '@/common/constants';

import useStyles from './useStyles';
import validationSchema from './validationSchema';

const LoginForm = () => {
  const { t } = useTranslation();
  const { classes } = useStyles();
  const { login } = auth.actions();

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={login}
      validationSchema={validationSchema(t)}
    >
      {({ touched, errors }) => (
        <Form className={classes.loginForm}>
          <Text className={classes.loginFormText}>
            {t('forms.login.data.title')}
          </Text>
          <Forms.TextField
            inputLabel={t('forms.login.data.label.email')}
            placeholder={t('forms.login.data.placeholder.email')}
            id="email"
            name="email"
            maxLength={40}
            trim
            error={touched.email && errors.email}
          />
          <Forms.TextField
            inputLabel={t('forms.login.data.label.password')}
            placeholder={t('forms.login.data.placeholder.password')}
            type="password"
            id="password"
            name="password"
            maxLength={25}
            error={touched.password && errors.password}
          />
          <Button variant="filled" type="submit">
            {t('forms.login.data.submitButton')}
          </Button>
          <Link
            to={paths.PASSWORD_RECOVERY_REQUEST}
            className={classes.forgotPassword}
          >
            {t('forms.login.data.forgotPassword')}
          </Link>
        </Form>
      )}
    </Formik>
  );
};

export default memo(LoginForm);
