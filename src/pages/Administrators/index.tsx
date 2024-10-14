import { Flex, Text, Title } from '@mantine/core';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Layouts, Navigation } from '@/components';

import { List, RolesInfo } from './components';
import useStyles from './useStyles';

const Administrators = () => {
  const { t } = useTranslation();
  const { classes } = useStyles();

  return (
    <Layouts.Page
      navbarChildren={
        <Navigation.Navbar.Wrapper labels={[t('page.administrators.title')]} />
      }
      childrenClassNames={classes.administratorsPageLayout}
    >
      <Flex className={classes.adminsContainer}>
        <Title order={4}>{t('page.administrators.title')}</Title>
        <List />
      </Flex>
      <Flex className={classes.infoContainer}>
        <Title order={4}>{t('page.administrators.rolesInfo.title')}</Title>
        <Text variant="subtitle">
          {t('page.administrators.rolesInfo.description')}
        </Text>
        <RolesInfo />
      </Flex>
    </Layouts.Page>
  );
};

export default memo(Administrators);
