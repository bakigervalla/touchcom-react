import { Accordion, Badge, Flex, Text } from '@mantine/core';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { WizardComponentProps } from '@/common/interfaces';
import { CreateDevice } from '@/common/models';
import { type } from '@/common/utils';

import useStyles from './useStyles';

interface GeneralProps {
  wizardProps: WizardComponentProps<CreateDevice>;
}

const General = ({ ...wizardProps }: GeneralProps) => {
  const { t } = useTranslation();
  const { classes } = useStyles();

  return (
    <Accordion.Item value="general">
      <Accordion.Control>{t('wizard.users.general.title')}</Accordion.Control>
      <Accordion.Panel className={classes.panelContainer}>
        <Flex>
          <Text w="50%">{t('forms.device.data.label.name')}</Text>
          <Text variant="subtitle">
            {wizardProps.wizardProps.wizardState.name}
          </Text>
        </Flex>
        <Flex>
          <Text w="50%">{t('forms.device.data.label.deviceType')}</Text>
          <Badge
            variant={type.getTypeVariant(
              wizardProps.wizardProps.wizardState?.type ?? '',
            )}
          >
            {t(
              type.getFormattedTypeName(
                wizardProps.wizardProps.wizardState?.type ?? '-',
              ),
            )}
          </Badge>
        </Flex>
        <Flex>
          <Text w="50%">{t('forms.device.data.label.version')}</Text>
          {wizardProps.wizardProps.wizardState.version?.tag && (
            <Badge variant="neutral-outlined">
              {wizardProps.wizardProps.wizardState.version?.tag}
            </Badge>
          )}
        </Flex>
        <Flex>
          <Text w="50%">{t('forms.device.data.label.street')}</Text>
          <Text variant="subtitle">
            {wizardProps.wizardProps.wizardState?.address?.street ?? '-'}
          </Text>
        </Flex>
        <Flex>
          <Text w="50%">{t('forms.device.data.label.floor')}</Text>
          <Text variant="subtitle">
            {wizardProps.wizardProps.wizardState.floor}
          </Text>
        </Flex>
      </Accordion.Panel>
    </Accordion.Item>
  );
};

export default memo(General);
