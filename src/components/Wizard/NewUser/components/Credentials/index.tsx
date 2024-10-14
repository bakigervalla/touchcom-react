import { Flex, Text, Title } from '@mantine/core';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { WizardComponentProps } from '@/common/interfaces';
import { CreateUser } from '@/common/models';

import { CredentialsForm } from './components';
import useStyles from './useStyles';

interface CredentialsProps {
  wizardProps: WizardComponentProps<CreateUser>;
}

const Credentials = ({ ...wizardProps }: CredentialsProps) => {
  const { t } = useTranslation();
  const { classes } = useStyles();

  return (
    <Flex className={classes.credentialsContainer}>
      <Flex className={classes.headerContainer}>
        <Title order={4}>{t('wizard.users.credentials.title')}</Title>
        <Text variant="subtitle">{t('wizard.users.credentials.subtitle')}</Text>
      </Flex>
      <Flex className={classes.contentContainer}>
        <CredentialsForm wizardProps={wizardProps.wizardProps} />
      </Flex>
    </Flex>
  );
};

export default memo(Credentials);
