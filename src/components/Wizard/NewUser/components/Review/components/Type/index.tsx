import { Accordion, Badge, Flex, Text } from '@mantine/core';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { WizardComponentProps } from '@/common/interfaces';
import { CreateUser, UserType } from '@/common/models';
import { type } from '@/common/utils';

interface TypeProps {
  wizardProps: WizardComponentProps<CreateUser>;
}

const Type = ({ ...wizardProps }: TypeProps) => {
  const { t } = useTranslation();

  return (
    <Accordion.Item value="type">
      <Accordion.Control>{t('wizard.users.type.title')}</Accordion.Control>
      <Accordion.Panel>
        <Flex>
          <Text w="50%">{t('forms.user.data.label.type')}</Text>
          <Badge
            variant={type.getTypeVariant(
              wizardProps.wizardProps.wizardState?.type ?? '',
            )}
          >
            {t(
              type.getFormattedTypeName(
                wizardProps.wizardProps.wizardState?.type ?? '',
              ),
            )}
          </Badge>
        </Flex>
        <Flex>
          <Text w="50%">{t('forms.user.data.label.floor')}</Text>
          <Text variant="subtitle">
            {wizardProps.wizardProps.wizardState.floor}
          </Text>
        </Flex>
        {wizardProps.wizardProps.wizardState.type === UserType.APARTMENT && (
          <Flex>
            <Text w="50%">{t('forms.user.data.label.number')}</Text>
            <Text variant="subtitle">
              {wizardProps.wizardProps.wizardState.number}
            </Text>
          </Flex>
        )}
      </Accordion.Panel>
    </Accordion.Item>
  );
};

export default memo(Type);
