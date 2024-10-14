import { Checkbox, Flex, Notification, Radio, Text, clsx } from '@mantine/core';
import { uniqBy as _uniqBy } from 'lodash';
import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';

import { role } from '@/data';

import { KeyPair } from '@/common/interfaces';
import { Permission, PermissionType } from '@/common/models';
import { type } from '@/common/utils';

import useStyles from './useStyles';

const PERMISSION_OPTIONS = {
  VIEW_ONLY: {
    id: 1,
    key: 'VIEW_ONLY',
    name: 'page.roles.permissionOptions.viewOnly',
  },
  MANAGE: { id: 2, key: 'MANAGE', name: 'page.roles.permissionOptions.manage' },
  NO_ACCESS: {
    id: 3,
    key: 'NO_ACCESS',
    name: 'page.roles.permissionOptions.noAccess',
  },
};

interface PermissionsSelectionProps {
  canEditPermissions: boolean;
  selectedPermissions: Permission[];
  selectedPermissionOptions: KeyPair<string>;
  handlePermissionSelect: (permission: Permission) => void;
  handlePermissionOptionSelect: (
    permissionType: string,
    optionKey: string,
  ) => void;
}

const PermissionsSelection = ({
  canEditPermissions,
  selectedPermissions,
  selectedPermissionOptions,
  handlePermissionOptionSelect,
  handlePermissionSelect,
}: PermissionsSelectionProps) => {
  const { t } = useTranslation();
  const { classes } = useStyles();
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string;
  }>(selectedPermissionOptions);
  const { permissions } = useRecoilValue(role.state.roleAtom);

  const isPermissionSelected = useCallback(
    (permission: Permission) =>
      !!selectedPermissions.find(
        (selectedPermission) => selectedPermission.id === permission.id,
      ),
    [selectedPermissions],
  );

  const handleOptionSelect = useCallback(
    (permissionType: string, optionKey: string) => {
      handlePermissionOptionSelect(permissionType, optionKey);
      setSelectedOptions((prev) => ({
        ...prev,
        [permissionType]: `${permissionType}_${optionKey}`,
      }));
    },
    [handlePermissionOptionSelect],
  );

  return (
    <Flex className={classes.permissionContainer}>
      {Object.values(PermissionType).map((permissionType) => (
        <Flex key={permissionType}>
          <Text variant="subtitle" w="30%">
            {t(type.getFormattedTypeName(permissionType))}
          </Text>
          {permissionType !== PermissionType.ADMIN_AND_ROLE &&
          permissionType !== PermissionType.EVENT &&
          permissionType !== PermissionType.CALL &&
          permissionType !== PermissionType.DEVICE_EVENT &&
          permissionType !== PermissionType.ACCESS ? (
            <Radio.Group
              name="permissions"
              defaultValue={
                selectedOptions[permissionType] ||
                `${permissionType}_${PERMISSION_OPTIONS.NO_ACCESS.key}`
              }
            >
              <Flex direction="column" gap={12}>
                {Object.values(PERMISSION_OPTIONS).map((option) => (
                  <Flex key={option.id} direction="column" gap={12}>
                    <Radio
                      label={t(option.name)}
                      disabled={!canEditPermissions}
                      name={`${permissionType}_${option.key}`}
                      value={`${permissionType}_${option.key}`}
                      onClick={() =>
                        handleOptionSelect(permissionType, option.key)
                      }
                    />
                    {selectedOptions[permissionType] ===
                      `${permissionType}_${option.key}` &&
                      `${permissionType}_${option.key}`.includes('MANAGE') &&
                      permissions && (
                        <Flex direction="column" ml={34}>
                          {permissions
                            .filter(
                              (permission) =>
                                permission.type === permissionType,
                            )
                            .map((permission) => (
                              <Checkbox
                                key={permission.id}
                                label={permission.name}
                                disabled={!canEditPermissions}
                                defaultChecked={isPermissionSelected(
                                  permission,
                                )}
                                onChange={() =>
                                  handlePermissionSelect(permission)
                                }
                              />
                            ))}
                        </Flex>
                      )}
                  </Flex>
                ))}
              </Flex>
            </Radio.Group>
          ) : (
            <Flex direction="column" gap={4}>
              {permissions
                .filter((permission) => permission.type === permissionType)
                .map((permission) => (
                  <Checkbox
                    key={permission.id}
                    label={permission.name}
                    disabled={!canEditPermissions}
                    defaultChecked={isPermissionSelected(permission)}
                    onChange={() => handlePermissionSelect(permission)}
                  />
                ))}
            </Flex>
          )}
        </Flex>
      ))}
      <Flex direction="column" ml="30%">
        <Notification withCloseButton={false} className={clsx(classes.infoBox)}>
          {t('infoSection.adminPermissions')}
        </Notification>
      </Flex>
    </Flex>
  );
};

export default memo(PermissionsSelection);
