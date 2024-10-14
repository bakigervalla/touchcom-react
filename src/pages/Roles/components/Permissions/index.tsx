import { Button, Flex, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { uniqBy as _uniqBy } from 'lodash';
import React, { Dispatch, memo, useCallback, useEffect, useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';

import {
  ConfirmationDialog,
  InlineEdit,
  Loaders,
  NotFound,
} from '@/components';
import { role } from '@/data';
import { NotFoundAccessLevelIcon } from '@/icons';

import { CommonUserRole } from '@/common/interfaces';
import { Permission, Role, RolePermission } from '@/common/models';
import { type } from '@/common/utils';

import { PermissionsSelection } from './components';
import useStyles from './useStyles';

interface RoleProps {
  data: Partial<Role> | null;
  isNewRoleCreation: boolean;
  handleCreateRole: () => void;
  handleNewRoleClick: () => void;
  handleUpdateRole: (values: Partial<Role>) => void;
  setNewRole: Dispatch<React.SetStateAction<Partial<Role>>>;
}

const Permissions = ({
  data,
  isNewRoleCreation,
  handleCreateRole,
  handleNewRoleClick,
  handleUpdateRole,
  setNewRole,
}: RoleProps) => {
  const { t } = useTranslation();
  const { classes } = useStyles();
  const [opened, { toggle, close }] = useDisclosure(false);
  const { removeRole, getPermissions } = role.actions();
  const { permissions, arePermissionsLoading } = useRecoilValue(
    role.state.roleAtom,
  );

  const rolePermissionNames = useMemo(
    () =>
      _uniqBy(data?.permissions, 'permission.type')
        ?.map((permission) =>
          t(type.getFormattedTypeName(permission.permission.type)),
        )
        .join(', '),
    [data, t],
  );

  const getSelectedPermissions = useCallback(
    (): Permission[] =>
      data?.permissions?.map(
        (permission) => permission.permission,
      ) as Permission[],
    [data],
  );

  const getMappedSelectedOptions = useCallback(() => {
    const selectedPermissions = getSelectedPermissions();
    return _uniqBy(selectedPermissions, 'type').reduce((prev, curr) => {
      const isManageable = selectedPermissions.some(
        (permission) =>
          permission.type === curr.type &&
          !permission.key.includes('LIST') &&
          !permission.key.includes('DETAILS'),
      );

      return {
        ...prev,
        [curr.type]: isManageable
          ? `${curr.type}_MANAGE`
          : `${curr.type}_VIEW_ONLY`,
      };
    }, {});
  }, [getSelectedPermissions]);

  const getViewOnlyPermissions = useCallback(
    (permissionType: string) => {
      const doesPermissionsWithSelectedTypeExist = data?.permissions?.some(
        (permission) => permission.permission.type === permissionType,
      );
      const typeViewOnlyPermissions = permissions
        .filter(
          (permission) =>
            permission.type === permissionType &&
            (permission.key.includes('LIST') ||
              permission.key.includes('DETAILS')),
        )
        .map((x) => ({ permissionId: x.id, permission: x }));
      return doesPermissionsWithSelectedTypeExist
        ? (data?.permissions?.filter((permission) =>
            permission.permission.type === permissionType
              ? permission.permission.key.includes('LIST') ||
                permission.permission.key.includes('DETAILS')
              : true,
          ) as RolePermission[])
        : [...(data?.permissions || []), ...typeViewOnlyPermissions];
    },
    [data, permissions],
  );

  const handlePermissionOptionSelect = useCallback(
    (permissionType: string, optionKey: string) => {
      let adjustedPermissions: RolePermission[] = data?.permissions || [];
      switch (optionKey) {
        case 'NO_ACCESS':
          adjustedPermissions = data?.permissions?.filter(
            (permission) => permission.permission.type !== permissionType,
          ) as RolePermission[];
          break;
        case 'VIEW_ONLY':
          adjustedPermissions = getViewOnlyPermissions(permissionType);
          break;
        default:
          return;
      }

      if (isNewRoleCreation) {
        setNewRole({ ...data, permissions: adjustedPermissions });
        return;
      }

      handleUpdateRole({ ...data, permissions: adjustedPermissions });
    },
    [
      data,
      getViewOnlyPermissions,
      handleUpdateRole,
      isNewRoleCreation,
      setNewRole,
    ],
  );

  const handlePermissionSelect = useCallback(
    (permission: Permission) => {
      const isPermissionAttached = data?.permissions?.some(
        (existingPermission) =>
          existingPermission.permission.id === permission.id,
      );

      let adjustedPermissions = [
        ...(data?.permissions || []),
        {
          permissionId: permission.id,
          permission,
        },
      ];

      if (isPermissionAttached) {
        adjustedPermissions = data?.permissions?.filter(
          (existingPermission) =>
            existingPermission.permissionId !== permission.id,
        ) as RolePermission[];
      }

      if (isNewRoleCreation) {
        setNewRole({ ...data, permissions: adjustedPermissions });
        return;
      }

      handleUpdateRole({ ...data, permissions: adjustedPermissions });
    },
    [data, handleUpdateRole, isNewRoleCreation, setNewRole],
  );

  const handleRemoveRole = useCallback(() => {
    close();
    removeRole(data as Role);
  }, [close, data, removeRole]);

  useEffect(() => {
    getPermissions();
  }, [getPermissions, data]);

  return data ? (
    <Flex className={classes.mainContainer}>
      <Flex className={classes.headerContainer}>
        <InlineEdit.Input
          value={data.name || ''}
          placeholder={t('forms.roles.data.placeholders.name')}
          onSetValue={(value) =>
            isNewRoleCreation
              ? setNewRole((prev) => ({ ...prev, name: value }))
              : handleUpdateRole({ ...data, name: value })
          }
          classNames={{ text: classes.title }}
        />
        {isNewRoleCreation ? (
          <Button
            ml="auto"
            className={classes.button}
            onClick={handleCreateRole}
            disabled={!data.name}
          >
            {t('common.save')}
          </Button>
        ) : (
          <Button
            variant="neutral"
            ml="auto"
            onClick={toggle}
            disabled={Object.values(CommonUserRole).some(
              (role) => role === data.key,
            )}
          >
            {t('common.delete')}
          </Button>
        )}
      </Flex>
      <Flex>
        <Text>
          <Trans
            i18nKey="page.roles.description"
            values={{
              roleName: data.name || t('page.roles.roleNamePlaceholder'),
              rolePermissionNames,
            }}
          >
            <b>role name</b> role has <b>{rolePermissionNames}</b> permissions.
            Depending on configured permissions user with this role will be able
            to perform certain type of actions.
          </Trans>
        </Text>
      </Flex>
      <Flex direction="column" gap={6}>
        <Title order={5}>{t('page.roles.permissions')}</Title>
        <Text>{t('page.roles.permissionsDescription')}</Text>
      </Flex>
      {arePermissionsLoading ? (
        <Flex pos="relative" h="100%">
          <Loaders.Overlay />
        </Flex>
      ) : (
        <PermissionsSelection
          canEditPermissions={
            !Object.values(CommonUserRole).some((role) => role === data.key)
          }
          selectedPermissions={getSelectedPermissions()}
          handlePermissionSelect={handlePermissionSelect}
          handlePermissionOptionSelect={handlePermissionOptionSelect}
          selectedPermissionOptions={getMappedSelectedOptions()}
        />
      )}
      <ConfirmationDialog
        isOpened={opened}
        positiveButtonText={t('common.confirm')}
        negativeButtonText={t('common.cancel')}
        text={t('dialogs.roles.delete.confirmationText')}
        title={t('dialogs.roles.delete.confirmationTitle')}
        negativeButtonClick={close}
        positiveButtonClick={handleRemoveRole}
      />
    </Flex>
  ) : (
    <Flex className={classes.notFoundContainer}>
      <NotFound
        Icon={NotFoundAccessLevelIcon}
        label="notFound.roles.label"
        description="notFound.roles.description"
      />
      <Button
        variant="neutral"
        onClick={handleNewRoleClick}
        leftIcon={<IconPlus size={18} />}
      >
        {t('page.roles.newRole')}
      </Button>
    </Flex>
  );
};

export default memo(Permissions);
