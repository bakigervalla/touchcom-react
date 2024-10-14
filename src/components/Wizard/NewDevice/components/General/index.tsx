import { Avatar, Flex, Title } from '@mantine/core';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';

import { version } from '@/data';

import Loaders from '@/components/Loaders';

import { placeholders } from '@/common/constants';
import { WizardComponentProps } from '@/common/interfaces';
import { CreateDevice } from '@/common/models';

import { DeviceForm } from './components';
import useStyles from './useStyles';

interface GeneralProps {
  wizardProps: WizardComponentProps<CreateDevice>;
}

const General = ({ ...wizardProps }: GeneralProps) => {
  const { t } = useTranslation();
  const { classes } = useStyles();
  const { areVersionsLoading } = useRecoilValue(version.state.versionAtom);

  return (
    <Flex className={classes.generalContainer}>
      <Title order={4}>{t('wizard.devices.general.title')}</Title>
      <Flex className={classes.contentContainer}>
        <Avatar
          src={`${placeholders.IMAGE_PLACEHOLDERS_URL}/${placeholders.SITE_PLACEHOLDER.SITE_A}`}
          className={classes.avatar}
        />
        {areVersionsLoading ? (
          <Loaders.Overlay />
        ) : (
          <DeviceForm wizardProps={wizardProps.wizardProps} />
        )}
      </Flex>
    </Flex>
  );
};

export default memo(General);
