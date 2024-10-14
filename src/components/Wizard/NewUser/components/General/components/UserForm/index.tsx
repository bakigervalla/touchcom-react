import { Select } from '@mantine/core';
import { Form, Formik } from 'formik';
import React, { memo, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { ArrowDownIcon } from '@/icons';

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
      {({ touched, errors, setFieldValue, values }) => (
        <Form className={classes.userForm}>
          <Forms.TextField
            inputLabel={t('forms.user.data.label.email')}
            placeholder={t('forms.user.data.placeholder.email')}
            id="email"
            name="email"
            withAsterisk
            maxLength={40}
            trim
            error={touched.email && errors.email}
          />
          <Forms.TextField
            inputLabel={t('forms.user.data.label.address')}
            placeholder={t('forms.user.data.placeholder.address')}
            id="address.street"
            name="address.street"
            maxLength={25}
          />
          <Forms.TextField
            inputLabel={t('forms.user.data.label.phone')}
            placeholder={t('forms.user.data.placeholder.phone')}
            id="phone"
            name="phone"
            withAsterisk
            maxLength={25}
            error={touched.phone && errors.phone}
          />
          <Select
            size="sm"
            id="floor"
            name="floor"
            label={t('forms.user.data.label.floor')}
            error={touched.floor && errors.floor}
            data={[
              { label: '0', value: '0' },
              { label: '1', value: '1' },
              { label: '2', value: '2' },
              { label: '3', value: '3' },
              { label: '4', value: '4' },
              { label: '5', value: '5' },
            ]}
            onChange={(value: string) =>
              void setFieldValue('floor', parseInt(value, 10))
            }
            placeholder={t('forms.device.data.placeholder.floor')}
            defaultValue={values.floor?.toString() ?? '0'}
            rightSection={<ArrowDownIcon size={18} />}
            withAsterisk
          />
        </Form>
      )}
    </Formik>
  );
};

export default memo(UserForm);
