import { Flex, Title } from '@mantine/core';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { WizardComponentProps } from '@/common/interfaces';
import { CreateUser } from '@/common/models';

import { TypeForm } from './components';
import useStyles from './useStyles';

interface TypeProps {
  wizardProps: WizardComponentProps<CreateUser>;
}

const Type = ({ ...wizardProps }: TypeProps) => {
  const { t } = useTranslation();
  const { classes } = useStyles();

  return (
    <Flex className={classes.typeContainer}>
      <Title order={4}>{t('wizard.users.type.title')}</Title>
      <TypeForm wizardProps={wizardProps.wizardProps} />
    </Flex>
  );
};

export default memo(Type);
