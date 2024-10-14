import { Flex, Group, Radio, Select, Title } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { Form, Formik, getIn } from 'formik';
import React, { memo, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';

import { accessLevel } from '@/data';
import { ArrowDownIcon } from '@/icons';

import Forms from '@/components/Forms';
import Loaders from '@/components/Loaders';

import { WizardComponentProps } from '@/common/interfaces';
import {
  AccessKey,
  AccessKeyType,
  AccessLevel,
  CreateUser,
} from '@/common/models';
import { type } from '@/common/utils';

import useStyles from './useStyles';
import validationSchema from './validationSchema';

interface AccessControlFormProps {
  wizardProps: WizardComponentProps<CreateUser>;
}

const AccessControlForm = ({ ...wizardProps }: AccessControlFormProps) => {
  const formRef = useRef<any>();
  const { t } = useTranslation();
  const { classes } = useStyles();
  const { getAccessLevels } = accessLevel.actions();
  const { accessLevels, areAccessLevelsLoading } = useRecoilValue(
    accessLevel.state.accessLevelAtom,
  );

  useEffect(() => {
    wizardProps.wizardProps.setStepRef(formRef);
  }, [wizardProps]);

  useEffect(() => {
    getAccessLevels();
  }, [getAccessLevels]);

  return (
    <Formik
      innerRef={formRef}
      validationSchema={validationSchema(t)}
      onSubmit={wizardProps.wizardProps.setWizardState}
      initialValues={wizardProps.wizardProps.wizardState}
    >
      {({ touched, errors, values, setFieldValue }) =>
        areAccessLevelsLoading ? (
          <Loaders.Overlay />
        ) : (
          <Form className={classes.credentialsForm}>
            <Select
              w="50%"
              id="accessControl"
              name="accessControl"
              rightSection={<ArrowDownIcon size={18} />}
              value={(
                values.accessControl?.accessGroup as AccessLevel
              )?.id?.toString()}
              label={t('forms.user.data.label.accessLevel')}
              placeholder={t('forms.user.data.placeholder.accessLevel')}
              data={accessLevels.map((accessLevel) => ({
                label: accessLevel.name,
                value: accessLevel.id.toString(),
              }))}
              onChange={(value: string) => {
                void setFieldValue('accessControl.accessGroup', {
                  id: parseInt(value, 10),
                });
              }}
            />
            <Title order={4}>{t('page.users.generateAccessKey')}</Title>
            <Forms.TextField
              w="50%"
              inputLabel={t('forms.user.data.label.accessKey.name')}
              placeholder={t('forms.user.data.placeholder.accessKey.name')}
              id="accessControl.accessKey.name"
              name="accessControl.accessKey.name"
              withAsterisk
              maxLength={25}
              error={
                touched.accessControl &&
                (getIn(errors, 'accessControl.accessKey.name') as string)
              }
            />
            <Flex className={classes.inputContainer}>
              <Forms.TextField
                w="50%"
                inputLabel={t('forms.user.data.label.accessKey.number')}
                placeholder={t('forms.user.data.placeholder.accessKey.number')}
                id="accessControl.accessKey.number"
                name="accessControl.accessKey.number"
                withAsterisk
                maxLength={25}
                error={
                  touched.accessControl &&
                  (getIn(errors, 'accessControl.accessKey.number') as string)
                }
              />
              <Radio.Group
                w="50%"
                name="accessControl.accessKey.type"
                label={t('forms.user.data.label.accessKey.type')}
                defaultValue={
                  (values.accessControl?.accessKey as AccessKey).type
                }
                withAsterisk
                onChange={(value: string) => {
                  void setFieldValue('accessControl.accessKey.type', value);
                }}
              >
                <Group mt="xs">
                  {Object.values(AccessKeyType).map((keyType) => (
                    <Radio
                      key={keyType}
                      value={keyType}
                      label={t(type.getFormattedTypeName(keyType))}
                    />
                  ))}
                </Group>
              </Radio.Group>
            </Flex>
            <Flex className={classes.inputContainer}>
              <Forms.TextField
                w="50%"
                inputLabel={t('forms.user.data.label.accessKey.id')}
                placeholder={t('forms.user.data.placeholder.accessKey.id')}
                id="accessControl.accessKey.tag"
                name="accessControl.accessKey.tag"
                maxLength={25}
                withAsterisk
                error={
                  touched.accessControl &&
                  (getIn(errors, 'accessControl.accessKey.tag') as string)
                }
              />
              <Forms.TextField
                w="50%"
                inputLabel={t('forms.user.data.label.accessKey.pin')}
                placeholder={t('forms.user.data.placeholder.accessKey.pin')}
                id="accessControl.accessKey.pin"
                name="accessControl.accessKey.pin"
                type="password"
                maxLength={25}
                withAsterisk
                error={
                  touched.accessControl &&
                  (getIn(errors, 'accessControl.accessKey.pin') as string)
                }
              />
            </Flex>
            <Flex className={classes.inputContainer}>
              <DateInput
                w="50%"
                id="accessControl.accessKey.validFrom"
                name="accessControl.accessKey.validFrom"
                label={t('forms.user.data.label.accessKey.validFrom')}
                popoverProps={{
                  withinPortal: true,
                  position: 'bottom-start',
                }}
                labelProps={{ className: classes.label }}
                dateParser={(input: string) => new Date(input)}
                valueFormat="MM/DD/YYYY"
                placeholder={t(
                  'forms.user.data.placeholder.accessKey.validFrom',
                )}
                clearable
                error={
                  touched.accessControl &&
                  (getIn(errors, 'accessControl.accessKey.validFrom') as string)
                }
              />
              <DateInput
                w="50%"
                id="accessControl.accessKey.validTo"
                name="accessControl.accessKey.validTo"
                label={t('forms.user.data.label.accessKey.validTo')}
                popoverProps={{
                  withinPortal: true,
                  position: 'bottom-start',
                }}
                labelProps={{ className: classes.label }}
                dateParser={(input: string) => new Date(input)}
                valueFormat="MM/DD/YYYY"
                placeholder={t('forms.user.data.placeholder.accessKey.validTo')}
                clearable
                error={
                  touched.accessControl &&
                  (getIn(errors, 'accessControl.accessKey.validTo') as string)
                }
              />
            </Flex>
          </Form>
        )
      }
    </Formik>
  );
};

export default memo(AccessControlForm);
