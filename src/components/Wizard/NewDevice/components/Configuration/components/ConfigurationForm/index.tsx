import { Flex, Group, Radio, Select, Text } from '@mantine/core';
import { Form, Formik, getIn } from 'formik';
import React, { memo, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { ArrowDownIcon } from '@/icons';

import CustomSlider from '@/components/CustomSlider';

import { WizardComponentProps } from '@/common/interfaces';
import { CreateDevice, LockStatus } from '@/common/models';
import { status } from '@/common/utils';

import useStyles from './useStyles';
import validationSchema from './validationSchema';

interface ConfigurationFormProps {
  wizardProps: WizardComponentProps<CreateDevice>;
}

const ConfigurationForm = ({ ...wizardProps }: ConfigurationFormProps) => {
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
      {({ touched, errors, values, setFieldValue }) => (
        <Form className={classes.configurationForm}>
          <Flex className={classes.inputContainer}>
            <Radio.Group
              name="configuration.lockStatus"
              label={t('forms.device.data.configuration.label.lockStatus')}
              defaultValue={values.configuration?.lockStatus}
              onChange={(value: string) => {
                void setFieldValue('configuration.lockStatus', value);
              }}
            >
              <Group mt="xs">
                {Object.values(LockStatus).map((type: string) => (
                  <Radio
                    radioGroup="configuration.lockStatus"
                    key={type}
                    value={type}
                    label={t(status.getFormattedStatusName(type))}
                  />
                ))}
              </Group>
            </Radio.Group>
            <Flex direction="column" w="100%">
              <Text>
                {t('forms.device.data.configuration.label.volumeLevel')}
              </Text>
              <CustomSlider
                value={values?.configuration?.volumeLevel}
                handleChange={(value: number) => {
                  void setFieldValue('configuration.volumeLevel', value);
                }}
              />
            </Flex>
          </Flex>
          <Flex w="48%">
            <Select
              id="configuration.screenSize"
              name="configuration.screenSize"
              value={values?.configuration?.screenSize}
              rightSection={<ArrowDownIcon size={18} />}
              label={t('forms.device.data.configuration.label.panelType')}
              placeholder={t(
                'forms.device.data.configuration.placeholder.panelType',
              )}
              data={[
                { label: '10 inch', value: 'INCH_10' },
                { label: '13 inch', value: 'INCH_13' },
              ]}
              onChange={(value: string) => {
                void setFieldValue('configuration.screenSize', value);
              }}
              error={
                touched.configuration &&
                (getIn(errors, 'configuration.screenSize') as string)
              }
            />
          </Flex>
          <Flex className={classes.inputContainer}>
            <Select
              id="configuration.heartbeatInterval"
              name="configuration.heartbeatInterval"
              rightSection={<ArrowDownIcon size={18} />}
              value={values?.configuration?.heartbeatInterval?.toString()}
              label={t(
                'forms.device.data.configuration.label.heartbeatInterval',
              )}
              placeholder={t(
                'forms.device.data.configuration.placeholder.heartbeatInterval',
              )}
              data={[
                { label: '10s', value: '10' },
                { label: '30s', value: '30' },
                { label: '5min', value: '300' },
                { label: '10min', value: '600' },
              ]}
              onChange={(value: string) => {
                void setFieldValue(
                  'configuration.heartbeatInterval',
                  parseInt(value, 10),
                );
              }}
              error={
                touched.configuration &&
                (getIn(errors, 'configuration.heartbeatInterval') as string)
              }
            />
            <Select
              id="configuration.mainScreenDelay"
              name="configuration.mainScreenDelay"
              rightSection={<ArrowDownIcon size={18} />}
              value={values?.configuration?.mainScreenDelay?.toString()}
              label={t('forms.device.data.configuration.label.mainScreenDelay')}
              placeholder={t(
                'forms.device.data.configuration.placeholder.mainScreenDelay',
              )}
              data={[
                { label: '10s', value: '10' },
                { label: '30s', value: '30' },
                { label: '5min', value: '300' },
                { label: '10min', value: '600' },
              ]}
              onChange={(value: string) => {
                void setFieldValue(
                  'configuration.mainScreenDelay',
                  parseInt(value, 10),
                );
              }}
              error={
                touched.configuration &&
                (getIn(errors, 'configuration.mainScreenDelay') as string)
              }
            />
          </Flex>
          <Flex className={classes.inputContainer}>
            <Select
              id="configuration.horizontal"
              name="configuration.horizontal"
              rightSection={<ArrowDownIcon size={18} />}
              value={values?.configuration?.horizontal?.toString()}
              label={t('forms.device.data.configuration.label.isHorizontal')}
              placeholder={t(
                'forms.device.data.configuration.placeholder.isHorizontal',
              )}
              data={[
                { label: 'Yes', value: 'true' },
                { label: 'No', value: 'false' },
              ]}
              onChange={(value: string) => {
                void setFieldValue('configuration.horizontal', value);
              }}
              error={
                touched.configuration &&
                (getIn(errors, 'configuration.horizontal') as string)
              }
            />
            <Select
              id="configuration.closeDoorTime"
              name="configuration.closeDoorTime"
              rightSection={<ArrowDownIcon size={18} />}
              value={values?.configuration?.closeDoorTime?.toString()}
              label={t('forms.device.data.configuration.label.closeDoorTime')}
              placeholder={t(
                'forms.device.data.configuration.placeholder.closeDoorTime',
              )}
              data={[
                { label: '10s', value: '10' },
                { label: '30s', value: '30' },
                { label: '5min', value: '300' },
                { label: '10min', value: '600' },
              ]}
              onChange={(value: string) => {
                void setFieldValue(
                  'configuration.closeDoorTime',
                  parseInt(value, 10),
                );
              }}
              error={
                touched.configuration &&
                (getIn(errors, 'configuration.closeDoorTime') as string)
              }
            />
          </Flex>
          <Flex className={classes.inputContainer}>
            <Select
              id="configuration.rotation"
              name="configuration.rotation"
              rightSection={<ArrowDownIcon size={18} />}
              value={values?.configuration?.rotation?.toString()}
              label={t('forms.device.data.configuration.label.deviceRotation')}
              placeholder={t(
                'forms.device.data.configuration.placeholder.deviceRotation',
              )}
              data={[
                { label: '0', value: '0' },
                { label: '90°', value: '90' },
                { label: '180°', value: '180' },
                { label: '270°', value: '270' },
              ]}
              onChange={(value: string) => {
                void setFieldValue(
                  'configuration.rotation',
                  parseInt(value, 10),
                );
              }}
              error={
                touched.configuration &&
                (getIn(errors, 'configuration.rotation') as string)
              }
            />
            <Select
              id="configuration.cameraRotation"
              name="configuration.cameraRotation"
              rightSection={<ArrowDownIcon size={18} />}
              value={values?.configuration?.cameraRotation?.toString()}
              label={t('forms.device.data.configuration.label.cameraRotation')}
              placeholder={t(
                'forms.device.data.configuration.placeholder.cameraRotation',
              )}
              data={[
                { label: '0', value: '0' },
                { label: '90°', value: '90' },
                { label: '180°', value: '180' },
                { label: '270°', value: '270' },
              ]}
              onChange={(value: string) => {
                void setFieldValue(
                  'configuration.cameraRotation',
                  parseInt(value, 10),
                );
              }}
              error={
                touched.configuration &&
                (getIn(errors, 'configuration.cameraRotation') as string)
              }
            />
          </Flex>
          <Flex className={classes.inputContainer}>
            <Select
              id="configuration.waitBranchLevel"
              name="configuration.waitBranchLevel"
              rightSection={<ArrowDownIcon size={18} />}
              value={values?.configuration?.waitBranchLevel?.toString()}
              label={t('forms.device.data.configuration.label.waitBranchLevel')}
              placeholder={t(
                'forms.device.data.configuration.placeholder.waitBranchLevel',
              )}
              data={[
                { label: '10s', value: '10' },
                { label: '20s', value: '20' },
                { label: '30s', value: '30' },
                { label: '5min', value: '300' },
                { label: '10min', value: '600' },
              ]}
              onChange={(value: string) => {
                void setFieldValue(
                  'configuration.waitBranchLevel',
                  parseInt(value, 10),
                );
              }}
              error={
                touched.configuration &&
                (getIn(errors, 'configuration.waitBranchLevel') as string)
              }
            />
            <Flex direction="column" w="100%">
              <Text>
                {t('forms.device.data.configuration.label.activeBranchLevel')}
              </Text>
              <CustomSlider
                value={values?.configuration?.activeBranchLevel}
                handleChange={(value: number) => {
                  void setFieldValue('configuration.activeBranchLevel', value);
                }}
              />
            </Flex>
          </Flex>
          <Flex className={classes.inputContainer}>
            <Select
              id="configuration.callTimeout"
              name="configuration.callTimeout"
              rightSection={<ArrowDownIcon size={18} />}
              value={values?.configuration?.callTimeout?.toString()}
              label={t('forms.device.data.configuration.label.callTimeout')}
              placeholder={t(
                'forms.device.data.configuration.placeholder.callTimeout',
              )}
              data={[
                { label: '10s', value: '10' },
                { label: '20s', value: '20' },
                { label: '30s', value: '30' },
                { label: '5min', value: '300' },
                { label: '10min', value: '600' },
              ]}
              onChange={(value: string) => {
                void setFieldValue(
                  'configuration.callTimeout',
                  parseInt(value, 10),
                );
              }}
              error={
                touched.configuration &&
                (getIn(errors, 'configuration.callTimeout') as string)
              }
            />
            <Flex direction="column" w="100%">
              <Text>{t('forms.device.data.configuration.label.scaling')}</Text>
              <CustomSlider
                value={values?.configuration?.scaling}
                handleChange={(value: number) => {
                  void setFieldValue('configuration.scaling', value);
                }}
              />
            </Flex>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

export default memo(ConfigurationForm);
