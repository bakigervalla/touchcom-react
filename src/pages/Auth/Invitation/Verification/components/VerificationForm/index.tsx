import { Button, Text } from '@mantine/core';
import { Form, Formik } from 'formik';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { Forms } from '@/components';
import { user } from '@/data';

import { paths } from '@/common/constants';

import useStyles from './useStyles';
import validationSchema from './validationSchema';

const VerificationForm = () => {
  const { t } = useTranslation();
  const { classes } = useStyles();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const token = searchParams.get('token');
  const { acceptUserInvitation } = user.actions();

  return (
    <Formik
      initialValues={{ invitationToken: token as string, password: '' }}
      onSubmit={acceptUserInvitation}
      validationSchema={validationSchema(t)}
    >
      {({ touched, errors }) => (
        <Form className={classes.verificationForm}>
          <Text className={classes.verificationFormText}>
            {t('forms.invitation.verification.data.title')}
          </Text>
          <Forms.TextField
            inputLabel={t(
              'forms.invitation.verification.data.label.invitationToken',
            )}
            placeholder={t(
              'forms.invitation.verification.data.placeholder.invitationToken',
            )}
            id="invitationToken"
            name="invitationToken"
            maxLength={40}
            trim
            error={touched.invitationToken && errors.invitationToken}
          />
          <Forms.TextField
            inputLabel={t('forms.invitation.verification.data.label.password')}
            placeholder={t(
              'forms.invitation.verification.data.placeholder.password',
            )}
            type="password"
            id="password"
            name="password"
            maxLength={25}
            error={touched.password && errors.password}
          />
          <Button variant="filled" type="submit">
            {t('forms.invitation.verification.data.submitButton')}
          </Button>
          <Text variant="caption" className={classes.subtitle}>
            {t('forms.invitation.alreadyHaveAccount')}
            <Link to={paths.LOGIN} className="link">
              {` ${t('forms.invitation.signInLink')}`}
            </Link>
          </Text>
        </Form>
      )}
    </Formik>
  );
};

export default memo(VerificationForm);
