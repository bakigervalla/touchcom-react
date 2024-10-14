import { Flex, Text, Title } from '@mantine/core';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { WizardComponentProps } from '@/common/interfaces';
import { CreateUser } from '@/common/models';

import { AccessControlForm } from './components';
import useStyles from './useStyles';

interface AccessControlProps {
  wizardProps: WizardComponentProps<CreateUser>;
}

const AccessControl = ({ ...wizardProps }: AccessControlProps) => {
  const { t } = useTranslation();
  const { classes } = useStyles();

  return (
    <Flex className={classes.accessControlContainer}>
      <Flex className={classes.headerContainer}>
        <Title order={4}>{t('wizard.users.accessControl.title')}</Title>
        <Text variant="subtitle">
          {t('wizard.users.accessControl.subtitle')}
        </Text>
      </Flex>
      <Flex className={classes.contentContainer}>
        <AccessControlForm wizardProps={wizardProps.wizardProps} />
      </Flex>
    </Flex>
  );
};

export default memo(AccessControl);
