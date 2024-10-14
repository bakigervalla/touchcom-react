import { Flex, Title } from '@mantine/core';
import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Layouts, Navigation } from '@/components';
import { accessLevel } from '@/data';

import { AccessLevel as IAccessLevel } from '@/common/models';

import { AccessLevel, SavedAccessLevels } from './components';
import useStyles from './useStyles';

const NEW_ACCESS_LEVEL_DEFAULT = {
  name: '',
  color: '#757575',
};

const AccessLevels = () => {
  const { t } = useTranslation();
  const { classes } = useStyles();
  const [createNewAccessLevel, setCreateNewAccessLevel] = useState(false);
  const [activeAccessLevel, setActiveAccessLevel] =
    useState<Partial<IAccessLevel> | null>(null);
  const [newAccessLevel, setNewAccessLevel] = useState<Partial<IAccessLevel>>(
    NEW_ACCESS_LEVEL_DEFAULT,
  );
  const { createAccessLevel, updateAccessLevel, resetAccessLevelState } =
    accessLevel.actions();

  const handleCreateAccessLevel = useCallback(() => {
    createAccessLevel(newAccessLevel);
    setNewAccessLevel(NEW_ACCESS_LEVEL_DEFAULT);
  }, [createAccessLevel, newAccessLevel]);

  const handleUpdateAccessLevel = useCallback(
    (values: Partial<IAccessLevel>) => {
      updateAccessLevel(values);
    },
    [updateAccessLevel],
  );

  const handleNewAccessLevelClick = useCallback(() => {
    setActiveAccessLevel(null);
    setNewAccessLevel(NEW_ACCESS_LEVEL_DEFAULT);
    setCreateNewAccessLevel((prev) => !prev);
    resetAccessLevelState();
  }, [resetAccessLevelState]);

  const handleAccessLevelClick = useCallback(
    (item: Partial<IAccessLevel>) => {
      setCreateNewAccessLevel(false);
      setActiveAccessLevel((prev) =>
        !prev || (item && prev.id !== item.id) ? item : null,
      );
      if (item.id === activeAccessLevel?.id) {
        resetAccessLevelState();
      }
    },
    [activeAccessLevel, resetAccessLevelState],
  );

  return (
    <Layouts.Page
      navbarChildren={
        <Navigation.Navbar.Wrapper labels={[t('page.accessLevels.title')]} />
      }
      childrenClassNames={classes.accessLevelsPageLayout}
    >
      <Flex className={classes.savedAccessLevelsContainer}>
        <Title order={4}>{t('page.accessLevels.savedAccessLevels')}</Title>
        <SavedAccessLevels
          activeAccessLevel={activeAccessLevel}
          handleAccessLevelClick={handleAccessLevelClick}
          handleNewAccessLevelClick={handleNewAccessLevelClick}
        />
      </Flex>
      <Flex className={classes.accessLevelInfoContainer}>
        <AccessLevel
          setNewAccessLevel={setNewAccessLevel}
          isNewAccessLevelCreation={createNewAccessLevel}
          handleCreateAccessLevel={handleCreateAccessLevel}
          handleUpdateAccessLevel={handleUpdateAccessLevel}
          handleNewAccessLevelClick={handleNewAccessLevelClick}
          data={createNewAccessLevel ? newAccessLevel : activeAccessLevel}
        />
      </Flex>
    </Layouts.Page>
  );
};

export default memo(AccessLevels);
