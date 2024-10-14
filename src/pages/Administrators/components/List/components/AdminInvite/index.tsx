import { Button, Flex, Notification, Select, Text } from '@mantine/core';
import { Form, Formik } from 'formik';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';

import { Forms } from '@/components';
import { role } from '@/data';
import { ArrowDownIcon } from '@/icons';

import { InviteUser } from '@/common/models';

import useStyles from './useStyles';
import validationSchema from './validationSchema';

interface AdminInviteProps {
  handleSubmit: (values: InviteUser) => void;
}

const AdminInvite = ({ handleSubmit }: AdminInviteProps) => {
  const { t } = useTranslation();
  const { classes } = useStyles();
  const { adminRoles } = useRecoilValue(role.state.roleAtom);

  return (
    <Formik
      validationSchema={validationSchema(t)}
      onSubmit={handleSubmit}
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        roleId: undefined,
      }}
    >
      {({ touched, errors, setFieldValue }) => (
        <Form className={classes.inviteAdminForm}>
          <Flex align="center" gap={10}>
            <Text variant="subtitle">
              {t('forms.administrators.adminInvite.data.label.firstName')}
            </Text>
            <Forms.TextField
              placeholder={t(
                'forms.administrators.adminInvite.data.placeholders.firstName',
              )}
              id="firstName"
              name="firstName"
              maxLength={25}
              error={touched.firstName && errors.firstName}
            />
          </Flex>
          <Flex align="center" gap={10}>
            <Text variant="subtitle">
              {t('forms.administrators.adminInvite.data.label.lastName')}
            </Text>
            <Forms.TextField
              placeholder={t(
                'forms.administrators.adminInvite.data.placeholders.lastName',
              )}
              id="lastName"
              name="lastName"
              maxLength={25}
              error={touched.lastName && errors.lastName}
            />
          </Flex>
          <Flex align="center" gap={10}>
            <Text variant="subtitle">
              {t('forms.administrators.adminInvite.data.label.email')}
            </Text>
            <Forms.TextField
              placeholder={t(
                'forms.administrators.adminInvite.data.placeholders.email',
              )}
              id="email"
              name="email"
              maxLength={25}
              error={touched.email && errors.email}
            />
          </Flex>
          <Flex align="center" gap={10}>
            <Text variant="subtitle">
              {t('forms.administrators.adminInvite.data.label.role')}
            </Text>
            <Select
              id="role"
              name="role"
              variant="underlined"
              rightSection={<ArrowDownIcon size={18} />}
              placeholder={t(
                'forms.administrators.adminInvite.data.placeholders.role',
              )}
              data={adminRoles.map((role) => ({
                label: role.name,
                value: role.id.toString(),
              }))}
              onChange={(value: string) => {
                void setFieldValue('roleId', parseInt(value, 10));
              }}
              error={touched.roleId && errors.roleId}
            />
          </Flex>
          <Flex>
            <Notification withCloseButton={false} className={classes.infoBox}>
              {t('forms.administrators.adminInvite.data.label.info')}
            </Notification>
          </Flex>
          <Flex direction="column" gap={12}>
            <Button
              type="submit"
              variant="filled"
              ml="auto"
              className={classes.submitButton}
            >
              {t('common.submit')}
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

export default memo(AdminInvite);
