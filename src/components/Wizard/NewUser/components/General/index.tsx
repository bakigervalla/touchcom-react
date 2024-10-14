import { Avatar, Flex, Title } from '@mantine/core';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { placeholders } from '@/common/constants';
import { WizardComponentProps } from '@/common/interfaces';
import { CreateUser } from '@/common/models';

import { UserForm } from './components';
import useStyles from './useStyles';

interface GeneralProps {
  wizardProps: WizardComponentProps<CreateUser>;
}

const General = ({ ...wizardProps }: GeneralProps) => {
  const { t } = useTranslation();
  const { classes } = useStyles();

  return (
    <Flex className={classes.generalContainer}>
      <Title order={4}>{t('wizard.users.general.title')}</Title>
      <Flex className={classes.contentContainer}>
        <Avatar
          color="orange"
          src={placeholders.RANDOM_PLACEHOLDER_URL}
          className={classes.avatar}
        />
        <UserForm wizardProps={wizardProps.wizardProps} />
      </Flex>
    </Flex>
  );
};

export default memo(General);
