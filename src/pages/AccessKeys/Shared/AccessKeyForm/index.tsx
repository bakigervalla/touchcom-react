import { Button, Flex, Radio } from '@mantine/core';
import { Form, Formik } from 'formik';
import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Forms } from '@/components';
import { ArrowRightIcon } from '@/icons';

import { KeyPair } from '@/common/interfaces';
import { AccessKey, AccessKeyType } from '@/common/models';
import { type as typeUtils } from '@/common/utils';

import useStyles from './useStyles';
import validationSchema from './validationSchema';

const ENABLE_KEY_ATTACHMENT_TO_USER = false;

const ATTACH_KEY_OPTION = {
  LATER: 'page.accessKeys.attachKeyOption.later',
  ATTACH_NOW: 'page.accessKeys.attachKeyOption.attachNow',
};

interface AccessKeyFormProps {
  handleSubmit: (values: Partial<AccessKey>) => void;
}

const AccessKeyForm = ({ handleSubmit }: AccessKeyFormProps) => {
  const { t } = useTranslation();
  const { classes } = useStyles();
  const [shouldAttachKey, setShouldAttachKey] = useState('LATER');

  return (
    <Formik
      validationSchema={validationSchema(t)}
      onSubmit={(values, { resetForm }) => {
        handleSubmit(values);
        resetForm();
      }}
      initialValues={{
        name: '',
        tag: '',
        number: '',
        type: AccessKeyType.CARD,
      }}
    >
      {({ touched, errors, values, setFieldValue }) => (
        <Form className={classes.accessKeyForm}>
          <Forms.TextField
            inputLabel={t('forms.accessKey.data.label.name')}
            placeholder={t('forms.accessKey.data.placeholder.name')}
            id="name"
            name="name"
            withAsterisk
            error={touched.name && errors.name}
          />
          <Flex gap={16}>
            <Forms.TextField
              w="50%"
              inputLabel={t('forms.accessKey.data.label.number')}
              placeholder={t('forms.accessKey.data.placeholder.number')}
              id="number"
              name="number"
              withAsterisk
              maxLength={25}
              error={touched.number && errors.number}
            />
            <Forms.TextField
              w="50%"
              inputLabel={t('forms.accessKey.data.label.tag')}
              placeholder={t('forms.accessKey.data.placeholder.tag')}
              id="tag"
              name="tag"
              withAsterisk
              maxLength={25}
              error={touched.tag && errors.tag}
            />
          </Flex>
          <Radio.Group
            name="type"
            label={t('forms.accessKey.data.label.keyType')}
            defaultValue={values.type}
            withAsterisk
            onChange={(value: string) => {
              void setFieldValue('type', value);
            }}
          >
            <Flex className={classes.radioButtonsContainer}>
              {Object.values(AccessKeyType).map((type: string) => (
                <Radio
                  key={type}
                  value={type}
                  label={t(typeUtils.getFormattedTypeName(type))}
                />
              ))}
            </Flex>
          </Radio.Group>
          {ENABLE_KEY_ATTACHMENT_TO_USER && (
            <Radio.Group
              label={t('page.accessKeys.attachKey')}
              defaultValue={shouldAttachKey}
              withAsterisk
              onChange={(value: string) => setShouldAttachKey(value)}
            >
              <Flex className={classes.radioButtonsContainer}>
                {Object.keys(ATTACH_KEY_OPTION).map((option) => (
                  <Radio
                    key={option}
                    value={option}
                    label={t((ATTACH_KEY_OPTION as KeyPair<string>)[option])}
                    className={classes.radioButton}
                  />
                ))}
              </Flex>
            </Radio.Group>
          )}
          <Button
            className={classes.button}
            type="submit"
            rightIcon={<ArrowRightIcon size={16} />}
          >
            {t('page.accessKeys.saveKey')}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default memo(AccessKeyForm);
