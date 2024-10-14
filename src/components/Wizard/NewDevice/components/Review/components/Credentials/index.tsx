import { Accordion, Flex, Text } from '@mantine/core';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { WizardComponentProps } from '@/common/interfaces';
import { CreateDevice } from '@/common/models';

import useStyles from './useStyles';

interface CredentialsProps {
  wizardProps: WizardComponentProps<CreateDevice>;
}

const Credentials = ({ ...wizardProps }: CredentialsProps) => {
  const { t } = useTranslation();
  const { classes } = useStyles();

  return (
    <Accordion.Item value="credentials">
      <Accordion.Control>
        {t('wizard.devices.credentials.title')}
      </Accordion.Control>
      <Accordion.Panel className={classes.panelContainer}>
        <Flex>
          <Text w="50%">{t('forms.device.data.label.email')}</Text>
          <Text variant="subtitle">
            {wizardProps.wizardProps.wizardState.credentials?.email}
          </Text>
        </Flex>
        <Flex>
          <Text w="50%">{t('forms.device.data.label.password')}</Text>
          <Text variant="subtitle">
            {wizardProps.wizardProps.wizardState.credentials?.password}
          </Text>
        </Flex>
      </Accordion.Panel>
    </Accordion.Item>
  );
};

export default memo(Credentials);
