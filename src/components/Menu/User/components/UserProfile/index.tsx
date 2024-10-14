import { Button, Flex, Select, Text } from '@mantine/core';
import { Form, Formik } from 'formik';
import { omit as _omit } from 'lodash';
import React, { ChangeEvent, memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';

import { auth, role, user } from '@/data';
import { ArrowDownIcon } from '@/icons';

import Forms from '@/components/Forms';
import ImageUploader from '@/components/ImageUploader';
import Input from '@/components/Input';

import { pagination, placeholders } from '@/common/constants';

import useStyles from './useStyles';
import validationSchema from './validationSchema';

interface UserProfileProps {
  onClose: () => void;
}
const UserProfile = ({ onClose }: UserProfileProps) => {
  const { t } = useTranslation();
  const { classes } = useStyles();
  const { getRoles } = role.actions();
  const { updateUser, changeImage } = user.actions();
  const { roles } = useRecoilValue(role.state.roleAtom);
  const { user: userData } = useRecoilValue(auth.state.authAtom);

  useEffect(() => {
    getRoles({
      page: pagination.DEFAULT_PAGE,
      pageSize: pagination.ROLES.PAGE_SIZE,
    });
  }, [getRoles]);

  return (
    <Flex gap={40}>
      <ImageUploader
        imageUrl={
          userData?.imageUrl ||
          `${placeholders.IMAGE_PLACEHOLDERS_URL}/${placeholders.USER_PLACEHOLDER.USER_A}`
        }
        action={(image) => changeImage(image, userData?.id ?? 0)}
      />
      <Formik
        validationSchema={validationSchema(t)}
        onSubmit={(values, { resetForm }) => {
          resetForm();
        }}
        initialValues={{
          password: '',
          confirmPassword: '',
        }}
      >
        {({ touched, errors }) => (
          <Form className={classes.userInfoContainer}>
            {userData?.firstName && userData.lastName ? (
              <>
                <Input.Root
                  value={userData?.firstName ?? '-'}
                  inputLabel={t('forms.user.data.label.firstName')}
                  placeholder={t('forms.user.data.placeholder.firstName')}
                  id="credentials.firstName"
                  name="credentials.firstName"
                  maxLength={25}
                  handleChange={(e: ChangeEvent<HTMLInputElement>) =>
                    updateUser({
                      ..._omit(userData, ['exp', 'iat', 'role']),
                      roleId: userData?.roleId,
                      firstName: e.target.value,
                    })
                  }
                  handleBlur={(e: ChangeEvent<HTMLInputElement>) =>
                    updateUser({
                      ..._omit(userData, ['exp', 'iat', 'role']),
                      roleId: userData?.roleId,
                      firstName: e.target.value,
                    })
                  }
                />
                <Input.Root
                  value={userData?.lastName ?? '-'}
                  inputLabel={t('forms.user.data.label.lastName')}
                  placeholder={t('forms.user.data.placeholder.lastName')}
                  id="credentials.lastName"
                  name="credentials.lastName"
                  maxLength={25}
                  handleChange={(e: ChangeEvent<HTMLInputElement>) =>
                    updateUser({
                      ..._omit(userData, ['exp', 'iat', 'role']),
                      roleId: userData?.roleId,
                      lastName: e.target.value,
                    })
                  }
                  handleBlur={(e: ChangeEvent<HTMLInputElement>) =>
                    updateUser({
                      ..._omit(userData, ['exp', 'iat', 'role']),
                      roleId: userData?.roleId,
                      lastName: e.target.value,
                    })
                  }
                />
              </>
            ) : (
              <Input.Root
                value={userData?.name ?? '-'}
                inputLabel={t('forms.user.data.label.name')}
                placeholder={t('forms.user.data.placeholder.name')}
                id="credentials.name"
                name="credentials.name"
                maxLength={25}
                handleChange={(e: ChangeEvent<HTMLInputElement>) =>
                  updateUser({
                    ..._omit(userData, ['exp', 'iat', 'role']),
                    roleId: userData?.roleId,
                    name: e.target.value,
                  })
                }
                handleBlur={(e: ChangeEvent<HTMLInputElement>) =>
                  updateUser({
                    ..._omit(userData, ['exp', 'iat', 'role']),
                    roleId: userData?.roleId,
                    name: e.target.value,
                  })
                }
              />
            )}
            <Input.Root
              value={userData?.email ?? '-'}
              inputLabel={t('forms.user.data.label.email')}
              placeholder={t('forms.user.data.placeholder.email')}
              id="credentials.email"
              name="credentials.email"
              maxLength={25}
              handleChange={(e: ChangeEvent<HTMLInputElement>) =>
                updateUser({
                  ..._omit(userData, ['exp', 'iat', 'role']),
                  roleId: userData?.roleId,
                  email: e.target.value,
                })
              }
              handleBlur={(e: ChangeEvent<HTMLInputElement>) =>
                updateUser({
                  ..._omit(userData, ['exp', 'iat', 'role']),
                  roleId: userData?.roleId,
                  email: e.target.value,
                })
              }
            />
            <Input.Root
              value={userData?.phone ?? '-'}
              inputLabel={t('forms.user.data.label.phone')}
              placeholder={t('forms.user.data.placeholder.phone')}
              id="credentials.phone"
              name="credentials.phone"
              maxLength={25}
              handleChange={(e: ChangeEvent<HTMLInputElement>) =>
                updateUser({
                  ..._omit(userData, ['exp', 'iat', 'role']),
                  roleId: userData?.roleId,
                  phone: e.target.value,
                })
              }
              handleBlur={(e: ChangeEvent<HTMLInputElement>) =>
                updateUser({
                  ..._omit(userData, ['exp', 'iat', 'role']),
                  roleId: userData?.roleId,
                  phone: e.target.value,
                })
              }
            />
            <Select
              id="role"
              name="role"
              value={userData?.role.id.toString()}
              rightSection={<ArrowDownIcon size={18} />}
              label={t('forms.administrators.adminInvite.data.label.role')}
              placeholder={t(
                'forms.administrators.adminInvite.data.placeholders.role',
              )}
              data={roles.map((role) => ({
                label: role.name,
                value: role.id.toString(),
              }))}
              onChange={(value: string) =>
                updateUser({
                  ..._omit(userData, ['exp', 'iat', 'role']),
                  roleId: parseInt(value, 10),
                })
              }
            />
            <Text className={classes.title}>
              {t('userMenu.profileSettings.changePassword')}
            </Text>
            <Forms.TextField
              id="password"
              name="password"
              inputLabel={t('forms.user.data.label.password')}
              placeholder={t('forms.user.data.placeholder.password')}
              type="password"
              maxLength={25}
              error={touched.password && errors.password}
            />
            <Forms.TextField
              id="confirmPassword"
              name="confirmPassword"
              inputLabel={t('forms.user.data.label.confirmPassword')}
              placeholder={t('forms.user.data.placeholder.confirmPassword')}
              type="password"
              maxLength={25}
              error={touched.confirmPassword && errors.confirmPassword}
            />
            <Flex gap={6}>
              <Button w="35%" variant="neutral" onClick={onClose}>
                {t('common.cancel')}
              </Button>
              <Button w="65%" type="submit" h={40}>
                {t('forms.device.data.saveButton')}
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Flex>
  );
};

export default memo(UserProfile);
