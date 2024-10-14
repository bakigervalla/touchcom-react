import { Accordion, Flex, Text } from '@mantine/core';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { WizardComponentProps } from '@/common/interfaces';
import { CreateUser } from '@/common/models';

interface CredentialsProps {
  wizardProps: WizardComponentProps<CreateUser>;
}

const Credentials = ({ ...wizardProps }: CredentialsProps) => {
  const { t } = useTranslation();

  return (
    <Accordion.Item value="credentials">
      <Accordion.Control>
        {t('wizard.users.credentials.title')}
      </Accordion.Control>
      <Accordion.Panel>
        <Flex>
          <Text w="50%">{t('forms.user.data.label.email')}</Text>
          <Text variant="subtitle">
            {wizardProps.wizardProps.wizardState.email}
          </Text>
        </Flex>
        <Flex>
          <Text w="50%">{t('forms.user.data.label.password')}</Text>
          <Text variant="subtitle">
            {wizardProps.wizardProps.wizardState.password}
          </Text>
        </Flex>
      </Accordion.Panel>
    </Accordion.Item>
  );
};

export default memo(Credentials);
