import { Accordion, Badge, Flex, Switch, Text } from '@mantine/core';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { WizardComponentProps } from '@/common/interfaces';
import { CreateDevice } from '@/common/models';
import { status, type } from '@/common/utils';

import useStyles from './useStyles';

interface ConfigurationProps {
  wizardProps: WizardComponentProps<CreateDevice>;
}

const Configuration = ({ ...wizardProps }: ConfigurationProps) => {
  const { t } = useTranslation();
  const { classes } = useStyles();

  return (
    <Accordion.Item value="configuration">
      <Accordion.Control>
        {t('wizard.devices.configuration.title')}
      </Accordion.Control>
      <Accordion.Panel className={classes.panelContainer}>
        <Flex>
          <Text w="50%">
            {t('forms.device.data.configuration.label.lockStatus')}
          </Text>
          <Badge
            variant={status.getStatusVariant(
              wizardProps.wizardProps.wizardState.configuration?.lockStatus ??
                '',
            )}
          >
            {t(
              status.getFormattedStatusName(
                wizardProps.wizardProps.wizardState.configuration?.lockStatus ??
                  '-',
              ),
            )}
          </Badge>
        </Flex>
        <Flex>
          <Text w="50%">
            {t('forms.device.data.configuration.label.panelType')}
          </Text>
          <Text variant="subtitle">
            {t(
              type.getFormattedTypeName(
                wizardProps.wizardProps.wizardState.configuration?.screenSize ??
                  '-',
              ),
            )}
          </Text>
        </Flex>
        <Flex>
          <Text w="50%">
            {t('forms.device.data.configuration.label.volumeLevel')}
          </Text>
          <Text variant="subtitle">
            {wizardProps.wizardProps.wizardState.configuration?.volumeLevel}
          </Text>
        </Flex>
        <Flex>
          <Text w="50%">
            {t('forms.device.data.configuration.label.heartbeatInterval')}
          </Text>
          <Text variant="subtitle">
            {
              wizardProps.wizardProps.wizardState.configuration
                ?.heartbeatInterval
            }
          </Text>
        </Flex>
        <Flex>
          <Text w="50%">
            {t('forms.device.data.configuration.label.mainScreenDelay')}
          </Text>
          <Text variant="subtitle">
            {wizardProps.wizardProps.wizardState.configuration?.mainScreenDelay}
          </Text>
        </Flex>
        <Flex>
          <Text w="50%">
            {t('forms.device.data.configuration.label.isHorizontal')}
          </Text>
          <Switch
            checked={
              wizardProps.wizardProps.wizardState.configuration?.horizontal
            }
          />
        </Flex>
        <Flex>
          <Text w="50%">
            {t('forms.device.data.configuration.label.closeDoorTime')}
          </Text>
          <Text variant="subtitle">
            {wizardProps.wizardProps.wizardState.configuration?.closeDoorTime}
          </Text>
        </Flex>
        <Flex>
          <Text w="50%">
            {t('forms.device.data.configuration.label.deviceRotation')}
          </Text>
          <Text variant="subtitle">
            {wizardProps.wizardProps.wizardState.configuration?.rotation}
          </Text>
        </Flex>
        <Flex>
          <Text w="50%">
            {t('forms.device.data.configuration.label.cameraRotation')}
          </Text>
          <Text variant="subtitle">
            {wizardProps.wizardProps.wizardState.configuration?.cameraRotation}
          </Text>
        </Flex>
        <Flex>
          <Text w="50%">
            {t('forms.device.data.configuration.label.waitBranchLevel')}
          </Text>
          <Text variant="subtitle">
            {wizardProps.wizardProps.wizardState.configuration?.waitBranchLevel}
          </Text>
        </Flex>
        <Flex>
          <Text w="50%">
            {t('forms.device.data.configuration.label.activeBranchLevel')}
          </Text>
          <Text variant="subtitle">
            {
              wizardProps.wizardProps.wizardState.configuration
                ?.activeBranchLevel
            }
          </Text>
        </Flex>
        <Flex>
          <Text w="50%">
            {t('forms.device.data.configuration.label.callTimeout')}
          </Text>
          <Text variant="subtitle">
            {wizardProps.wizardProps.wizardState.configuration?.callTimeout}
          </Text>
        </Flex>
        <Flex>
          <Text w="50%">
            {t('forms.device.data.configuration.label.scaling')}
          </Text>
          <Text variant="subtitle">
            {wizardProps.wizardProps.wizardState.configuration?.scaling}
          </Text>
        </Flex>
      </Accordion.Panel>
    </Accordion.Item>
  );
};

export default memo(Configuration);
