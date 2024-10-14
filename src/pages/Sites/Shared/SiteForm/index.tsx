import { Avatar, Button, Flex, Select } from '@mantine/core';
import { Form, Formik, FormikHelpers, getIn } from 'formik';
import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';

import { country } from '@/data';
import { ArrowDownIcon } from '@/icons';

import Forms from '@/components/Forms';

import { placeholders } from '@/common/constants';
import { Site } from '@/common/models';

import useStyles from './useStyles';
import validationSchema from './validationSchema';

interface SiteFormProps {
  initialValues: Site;
  onSubmit: (
    values: Site,
    formikHelpers: FormikHelpers<Site>,
  ) => void | Promise<any>;
  onCancel: () => void;
}

const SiteForm = ({ initialValues, onCancel, onSubmit }: SiteFormProps) => {
  const { t } = useTranslation();
  const { classes } = useStyles();
  const [searchValue, onSearchChange] = useState('');
  const { countries } = useRecoilValue(country.state.countryAtom);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema(t)}
    >
      {({ touched, errors, setFieldValue, values }) => (
        <Form className={classes.siteForm}>
          <Avatar
            className={classes.image}
            src={
              values.imageUrl ||
              `${placeholders.IMAGE_PLACEHOLDERS_URL}/${placeholders.SITE_PLACEHOLDER.SITE_A}`
            }
          />
          <Flex direction="column" gap={20}>
            <Forms.TextField
              inputLabel={t('forms.site.data.label.name')}
              placeholder={t('forms.site.data.placeholder.name')}
              id="name"
              name="name"
              withAsterisk
              maxLength={40}
              error={touched.name && errors.name}
            />
            <Forms.TextField
              inputLabel={t('forms.site.data.label.description')}
              placeholder={t('forms.site.data.placeholder.description')}
              id="description"
              name="description"
              maxLength={25}
              error={touched.description && errors.description}
            />
            <Select
              id="address.country"
              name="address.country"
              searchable
              clearable
              onSearchChange={onSearchChange}
              searchValue={searchValue}
              nothingFound={t('forms.site.data.noOptions')}
              label={t('forms.site.data.label.country')}
              placeholder={t('forms.site.data.placeholder.country')}
              onChange={(value) =>
                void setFieldValue(
                  'address.country',
                  JSON.parse(value as string),
                )
              }
              defaultValue={JSON.stringify(initialValues.address?.country)}
              data={countries?.map((country) => ({
                label: country.name,
                value: JSON.stringify(country),
              }))}
              creatable
              getCreateLabel={(query) => `+ Create ${query}`}
            />
            <Forms.TextField
              inputLabel={t('forms.site.data.label.city')}
              placeholder={t('forms.site.data.placeholder.city')}
              id="address.city"
              name="address.city"
              withAsterisk
              maxLength={25}
              error={
                touched.address && (getIn(errors, 'address.city') as string)
              }
            />
            <Forms.TextField
              size="sm"
              inputLabel={t('forms.site.data.label.postalCode')}
              placeholder={t('forms.site.data.placeholder.postalCode')}
              id="address.postalCode"
              name="address.postalCode"
              withAsterisk
              maxLength={25}
              error={
                touched.address &&
                (getIn(errors, 'address.postalCode') as string)
              }
            />
            <Forms.TextField
              inputLabel={t('forms.site.data.label.street')}
              placeholder={t('forms.site.data.placeholder.street')}
              id="address.street"
              name="address.street"
              withAsterisk
              maxLength={25}
              error={
                touched.address && (getIn(errors, 'address.street') as string)
              }
            />
            <Flex gap={16}>
              <Forms.TextField
                inputLabel={t('forms.site.data.label.number')}
                placeholder={t('forms.site.data.placeholder.number')}
                id="address.number"
                name="address.number"
                withAsterisk
                error={
                  touched.address && (getIn(errors, 'address.number') as string)
                }
              />
              <Select
                size="sm"
                id="floor"
                name="floor"
                label={t('forms.site.data.label.floor')}
                placeholder={t('forms.site.data.placeholder.floor')}
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
                defaultValue={values.floor?.toString() ?? '0'}
                rightSection={<ArrowDownIcon size={18} />}
              />
            </Flex>
            <Flex className={classes.buttonsContainer}>
              <Button
                className={classes.cancelButton}
                variant="neutral"
                onClick={onCancel}
              >
                {t('common.cancel')}
              </Button>
              <Button
                type="submit"
                variant="filled"
                className={classes.submitButton}
              >
                {t('common.submit')}
              </Button>
            </Flex>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

export default memo(SiteForm);
