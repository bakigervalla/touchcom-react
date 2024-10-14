import { Flex, Group, Radio, Select } from '@mantine/core';
import { Form, Formik, getIn } from 'formik';
import React, { memo, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';

import { version } from '@/data';
import { ArrowDownIcon } from '@/icons';

import Forms from '@/components/Forms';

import { WizardComponentProps } from '@/common/interfaces';
import { CreateDevice, DeviceType } from '@/common/models';
import { type as typeUtils } from '@/common/utils';

import useStyles from './useStyles';
import validationSchema from './validationSchema';

interface DeviceFormProps {
  wizardProps: WizardComponentProps<CreateDevice>;
}

const DeviceForm = ({ ...wizardProps }: DeviceFormProps) => {
  const formRef = useRef<any>();
  const { t } = useTranslation();
  const { classes } = useStyles();
  const { versions } = useRecoilValue(version.state.versionAtom);

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
      {({ touched, errors, values, setFieldValue }) => (
        <Form className={classes.deviceForm}>
          <Forms.TextField
            inputLabel={t('forms.device.data.label.name')}
            placeholder={t('forms.device.data.placeholder.name')}
            id="name"
            name="name"
            withAsterisk
            maxLength={40}
            error={touched.name && errors.name}
          />
          <Radio.Group
            name="type"
            label={t('forms.device.data.label.deviceType')}
            defaultValue={values.type}
            withAsterisk
            onChange={(value: string) => {
              void setFieldValue('type', value);
            }}
          >
            <Group mt="xs">
              {Object.values(DeviceType).map((type: string) => (
                <Radio
                  radioGroup="type"
                  key={type}
                  value={type}
                  label={t(typeUtils.getFormattedTypeName(type))}
                />
              ))}
            </Group>
          </Radio.Group>
          <Select
            size="sm"
            id="version"
            name="version"
            label={t('forms.device.data.label.version')}
            error={touched.version && (getIn(errors, 'version.id') as string)}
            data={versions.map((version) => ({
              label: version.tag,
              value: JSON.stringify(version),
            }))}
            onChange={(value) =>
              void setFieldValue('version', JSON.parse(value as string))
            }
            placeholder={t('forms.device.data.placeholder.version')}
            defaultValue={JSON.stringify(values.version)}
            rightSection={<ArrowDownIcon size={18} />}
            withAsterisk
          />
          <Forms.TextField
            inputLabel={t('forms.device.data.label.street')}
            placeholder={t('forms.device.data.placeholder.street')}
            id="address.street"
            name="address.street"
            withAsterisk
            error={
              touched.address && (getIn(errors, 'address.street') as string)
            }
          />
          <Flex gap={16}>
            <Forms.TextField
              inputLabel={t('forms.device.data.label.number')}
              placeholder={t('forms.device.data.placeholder.number')}
              id="address.number"
              name="address.number"
              type="number"
              withAsterisk
              error={
                touched.address && (getIn(errors, 'address.number') as string)
              }
            />
            <Select
              w="50%"
              size="sm"
              id="floor"
              name="floor"
              label={t('forms.device.data.label.floor')}
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
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

export default memo(DeviceForm);
