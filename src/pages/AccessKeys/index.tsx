import { Flex, Title } from '@mantine/core';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Layouts, Navigation } from '@/components';
import { accessKey } from '@/data';

import { SavedKeys } from './components';
import { AccessKeyForm } from './Shared';
import useStyles from './useStyles';

const AccessKeys = () => {
  const { t } = useTranslation();
  const { classes } = useStyles();
  const { createAccessKey } = accessKey.actions();

  return (
    <Layouts.Page
      navbarChildren={
        <Navigation.Navbar.Wrapper labels={[t('page.accessKeys.title')]} />
      }
      childrenClassNames={classes.accessKeysPageLayout}
    >
      <Flex className={classes.createKeyContainer}>
        <Title order={4}>{t('page.accessKeys.createAccessKey')}</Title>
        <AccessKeyForm handleSubmit={createAccessKey} />
      </Flex>
      <Flex className={classes.savedKeysContainer}>
        <Title order={4}>{t('page.accessKeys.savedKeys')}</Title>
        <SavedKeys />
      </Flex>
    </Layouts.Page>
  );
};

export default memo(AccessKeys);
