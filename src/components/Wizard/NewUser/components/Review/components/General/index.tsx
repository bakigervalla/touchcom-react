import { Accordion, Flex, Text } from '@mantine/core';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { WizardComponentProps } from '@/common/interfaces';
import { CreateUser, UserType } from '@/common/models';

interface GeneralProps {
  wizardProps: WizardComponentProps<CreateUser>;
}

const General = ({ ...wizardProps }: GeneralProps) => {
  const { t } = useTranslation();

  return (
    <Accordion.Item value="general">
      <Accordion.Control>{t('wizard.users.general.title')}</Accordion.Control>
      <Accordion.Panel>
        {wizardProps.wizardProps.wizardState.type === UserType.RESIDENT && (
          <>
            <Flex>
              <Text w="50%">{t('forms.user.data.label.firstName')}</Text>
              <Text variant="subtitle">
                {wizardProps.wizardProps.wizardState.firstName}
              </Text>
            </Flex>
            <Flex>
              <Text w="50%">{t('forms.user.data.label.lastName')}</Text>
              <Text variant="subtitle">
                {wizardProps.wizardProps.wizardState.lastName}
              </Text>
            </Flex>
          </>
        )}
        {wizardProps.wizardProps.wizardState.type !== UserType.RESIDENT && (
          <Flex>
            <Text w="50%">{t('forms.user.data.label.name')}</Text>
            <Text variant="subtitle">
              {wizardProps.wizardProps.wizardState.name}
            </Text>
          </Flex>
        )}
        <Flex>
          <Text w="50%">{t('forms.user.data.label.address')}</Text>
          <Text variant="subtitle">
            {wizardProps.wizardProps.wizardState.address?.street ?? '-'}
          </Text>
        </Flex>
        <Flex>
          <Text w="50%">{t('forms.user.data.label.phone')}</Text>
          <Text variant="subtitle">
            {wizardProps.wizardProps.wizardState.phone}
          </Text>
        </Flex>
        <Flex>
          <Text w="50%">{t('forms.user.data.label.email')}</Text>
          <Text variant="subtitle">
            {wizardProps.wizardProps.wizardState.email}
          </Text>
        </Flex>
      </Accordion.Panel>
    </Accordion.Item>
  );
};

export default memo(General);
