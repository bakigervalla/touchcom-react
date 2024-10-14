import { Flex, Radio } from '@mantine/core';
import { Form, Formik } from 'formik';
import React, { memo, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';

import { device } from '@/data';
import { NotFoundDeviceIcon } from '@/icons';

import Loaders from '@/components/Loaders';
import NotFound from '@/components/NotFound';

import { WizardComponentProps } from '@/common/interfaces';
import { CreateUser, Device, UserType } from '@/common/models';
import { type } from '@/common/utils';

import ApartmentForm from '../ApartmentForm';
import CompanyForm from '../CompanyForm';
import ResidentForm from '../ResidentForm';

import useStyles from './useStyles';
import validationSchema from './validationSchema';

const SHOW_SELECTED_DEVICES = false;

interface TypeFormProps {
  wizardProps: WizardComponentProps<CreateUser>;
}

const TypeForm = ({ ...wizardProps }: TypeFormProps) => {
  const formRef = useRef<any>();
  const { t } = useTranslation();
  const { classes } = useStyles();
  const [search, setSearch] = useState('');
  const { getDevices } = device.actions();
  const { devices, areDevicesLoading } = useRecoilValue(
    device.state.deviceAtom,
  );

  useEffect(() => {
    wizardProps.wizardProps.setStepRef(formRef);
  }, [wizardProps]);

  useEffect(() => {
    getDevices(undefined, { search });
  }, [getDevices, search]);

  return (
    <Formik
      innerRef={formRef}
      validationSchema={validationSchema(t)}
      onSubmit={wizardProps.wizardProps.setWizardState}
      initialValues={wizardProps.wizardProps.wizardState}
    >
      {({ touched, errors, values, setFieldValue }) => (
        <Form className={classes.typeForm}>
          <Radio.Group
            name="type"
            label={t('forms.user.data.label.userType')}
            defaultValue={wizardProps.wizardProps.wizardState.type}
            withAsterisk
            onChange={(value: string) => {
              void setFieldValue('type', value);
            }}
          >
            <Flex className={classes.radioButtonsContainer}>
              {Object.values(UserType).map((userType) => (
                <Radio
                  key={userType}
                  value={userType}
                  label={t(type.getFormattedTypeName(userType))}
                  className={classes.radioButton}
                />
              ))}
            </Flex>
          </Radio.Group>
          {values.type === UserType.RESIDENT &&
            (areDevicesLoading ? (
              <Loaders.Overlay />
            ) : (
              <ResidentForm
                searchResults={devices.map((device) => ({
                  id: device.id,
                  label: device.name,
                  subtitle: device?.address?.street ?? '-',
                  selected:
                    values.accessControl && 'device' in values.accessControl
                      ? (values.accessControl.device as Device).id === device.id
                      : false,
                }))}
                handleSearchResultClick={(item) =>
                  void setFieldValue('accessControl.device', { id: item.id })
                }
                handleSearch={setSearch}
                touched={touched}
                errors={errors}
              />
            ))}
          {values.type === UserType.APARTMENT &&
            (areDevicesLoading ? (
              <Loaders.Overlay />
            ) : (
              <ApartmentForm
                searchResults={devices.map((device) => ({
                  id: device.id,
                  label: device.name,
                  subtitle: device.address?.street ?? '-',
                  selected:
                    values.accessControl && 'device' in values.accessControl
                      ? (values.accessControl.device as Device).id === device.id
                      : false,
                }))}
                handleSearchResultClick={(item) =>
                  void setFieldValue('accessControl.device', { id: item.id })
                }
                handleSearch={setSearch}
                touched={touched}
                errors={errors}
              />
            ))}
          {values.type === UserType.COMPANY &&
            (areDevicesLoading ? (
              <Loaders.Overlay />
            ) : (
              <CompanyForm
                searchResults={devices.map((device) => ({
                  id: device.id,
                  label: device.name,
                  subtitle: device.address?.street ?? '-',
                  selected:
                    values.accessControl && 'device' in values.accessControl
                      ? (values.accessControl.device as Device).id === device.id
                      : false,
                }))}
                handleSearchResultClick={(item) =>
                  void setFieldValue('accessControl.device', { id: item.id })
                }
                handleSearch={setSearch}
                touched={touched}
                errors={errors}
              />
            ))}
          {SHOW_SELECTED_DEVICES && (
            <NotFound
              className={{ container: classes.notFoundContainer }}
              label="notFound.devicesNotAdded.label"
              description="notFound.devicesNotAdded.description"
              Icon={NotFoundDeviceIcon}
            />
          )}
        </Form>
      )}
    </Formik>
  );
};

export default memo(TypeForm);
