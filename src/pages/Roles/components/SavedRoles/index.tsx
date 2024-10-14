import { Flex } from '@mantine/core';
import React, { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';

import { DynamicDataContainer, Loaders } from '@/components';
import { role } from '@/data';

import { pagination as paginationConstants } from '@/common/constants';
import { Role } from '@/common/models';

import columns from './columns';
import useStyles from './useStyles';

interface SavedRolesProps {
  activeRole: Role | null;
  handleNewRoleClick: () => void;
  handleRoleClick: (role: Role) => void;
}

const SavedRoles = ({
  activeRole,
  handleRoleClick,
  handleNewRoleClick,
}: SavedRolesProps) => {
  const { t } = useTranslation();
  const { classes } = useStyles();
  const [currentPage] = useState(paginationConstants.DEFAULT_PAGE);
  const { getRoles } = role.actions();
  const { roles, areRolesLoading } = useRecoilValue(role.state.roleAtom);

  useEffect(() => {
    getRoles({
      page: currentPage,
      pageSize: paginationConstants.ROLES.PAGE_SIZE,
    });
  }, [currentPage, getRoles]);

  return (
    <Flex className={classes.savedRolesContainer}>
      <Flex className="newRoleContainer">
        <DynamicDataContainer<{ id: number; label: string }>
          columns={columns.newRole}
          onClick={handleNewRoleClick}
          data={[{ id: 1, label: t('page.roles.newRole') }]}
        />
      </Flex>
      {areRolesLoading ? (
        <Flex pos="relative" h="100%">
          <Loaders.Overlay />
        </Flex>
      ) : (
        <Flex className={classes.rolesList}>
          <DynamicDataContainer<Role>
            data={roles}
            columns={columns.role(classes)}
            onClick={handleRoleClick}
            isSelected={(item) => !!activeRole && item.id === activeRole.id}
          />
        </Flex>
      )}
    </Flex>
  );
};

export default memo(SavedRoles);
