import { Flex, Title } from '@mantine/core';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { WizardComponentProps } from '@/common/interfaces';
import { CreateDevice } from '@/common/models';

import { ConfigurationForm } from './components';
import useStyles from './useStyles';

interface ConfigurationProps {
  wizardProps: WizardComponentProps<CreateDevice>;
}

const Configuration = ({ ...wizardProps }: ConfigurationProps) => {
  const { t } = useTranslation();
  const { classes } = useStyles();

  return (
    <Flex className={classes.configurationContainer}>
      <Title order={4}>{t('wizard.devices.configuration.title')}</Title>
      <Flex className={classes.contentContainer}>
        <ConfigurationForm wizardProps={wizardProps.wizardProps} />
      </Flex>
    </Flex>
  );
};

export default memo(Configuration);
