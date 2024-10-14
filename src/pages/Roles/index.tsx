import { Flex, Title } from '@mantine/core';
import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Layouts, Navigation } from '@/components';
import { role } from '@/data';

import { Role } from '@/common/models';

import { Permissions, SavedRoles } from './components';
import useStyles from './useStyles';

const NEW_ROLE_DEFAULT = {
  name: '',
  permissions: [],
};

const Roles = () => {
  const { t } = useTranslation();
  const { classes } = useStyles();
  const [createNewRole, setCreateNewRole] = useState(false);
  const [activeRole, setActiveRole] = useState<Role | null>(null);
  const [newRole, setNewRole] = useState<Partial<Role>>(NEW_ROLE_DEFAULT);
  const { createRole, updateRole } = role.actions();

  const handleCreateRole = useCallback(() => {
    createRole(newRole);
    setNewRole(NEW_ROLE_DEFAULT);
  }, [createRole, newRole]);

  const handleUpdateRole = useCallback(
    (values: Partial<Role>) => {
      updateRole(values);
    },
    [updateRole],
  );

  const handleNewRoleClick = useCallback(() => {
    setActiveRole(null);
    setNewRole(NEW_ROLE_DEFAULT);
    setCreateNewRole((prev) => !prev);
  }, []);

  const handleRoleClick = useCallback((item: Role) => {
    setCreateNewRole(false);
    setActiveRole((prev) =>
      !prev || (item && prev.id !== item.id) ? item : null,
    );
  }, []);

  return (
    <Layouts.Page
      navbarChildren={
        <Navigation.Navbar.Wrapper labels={[t('page.roles.title')]} />
      }
      childrenClassNames={classes.rolesPageLayout}
    >
      <Flex className={classes.savedRolesContainer}>
        <Title order={4}>{t('page.roles.savedRoles')}</Title>
        <SavedRoles
          activeRole={activeRole}
          handleRoleClick={handleRoleClick}
          handleNewRoleClick={handleNewRoleClick}
        />
      </Flex>
      <Flex className={classes.roleDetailsContainer}>
        <Permissions
          setNewRole={setNewRole}
          isNewRoleCreation={createNewRole}
          handleCreateRole={handleCreateRole}
          handleUpdateRole={handleUpdateRole}
          handleNewRoleClick={handleNewRoleClick}
          data={createNewRole ? newRole : activeRole}
        />
      </Flex>
    </Layouts.Page>
  );
};

export default memo(Roles);
