import { Accordion, Badge, Flex, Text } from '@mantine/core';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { WizardComponentProps } from '@/common/interfaces';
import { AccessKey, CreateUser } from '@/common/models';

interface AccessControlProps {
  wizardProps: WizardComponentProps<CreateUser>;
}

const AccessControl = ({ ...wizardProps }: AccessControlProps) => {
  const { t } = useTranslation();

  return (
    <Accordion.Item value="accessControl">
      <Accordion.Control>
        {t('wizard.users.accessControl.title')}
      </Accordion.Control>
      <Accordion.Panel>
        <Flex>
          <Text w="50%">{t('forms.user.data.label.accessKey.id')}</Text>
          <Badge variant="neutral-outlined">
            {
              (
                wizardProps.wizardProps.wizardState.accessControl
                  ?.accessKey as AccessKey
              ).tag
            }
          </Badge>
        </Flex>
        <Flex>
          <Text w="50%">{t('forms.user.data.label.accessKey.number')}</Text>
          <Text variant="subtitle">
            {
              (
                wizardProps.wizardProps.wizardState.accessControl
                  ?.accessKey as AccessKey
              ).number
            }
          </Text>
        </Flex>
        <Flex>
          <Text w="50%">{t('forms.user.data.label.accessKey.name')}</Text>
          <Text variant="subtitle">
            {
              (
                wizardProps.wizardProps.wizardState.accessControl
                  ?.accessKey as AccessKey
              ).name
            }
          </Text>
        </Flex>
        <Flex>
          <Text w="50%">{t('forms.user.data.label.accessKey.pin')}</Text>
          <Text variant="subtitle">
            {
              (
                wizardProps.wizardProps.wizardState.accessControl
                  ?.accessKey as AccessKey
              ).pin
            }
          </Text>
        </Flex>
      </Accordion.Panel>
    </Accordion.Item>
  );
};

export default memo(AccessControl);
