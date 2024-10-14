/* eslint-disable react/jsx-props-no-spreading */
import { Accordion, Flex, Title } from '@mantine/core';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { PlusCircleIcon } from '@/icons';

import { WizardComponentProps } from '@/common/interfaces';
import { CreateUser } from '@/common/models';

import { AccessControl, Credentials, General, Type } from './components';
import useStyles from './useStyles';

interface ReviewProps {
  wizardProps: WizardComponentProps<CreateUser>;
}

const Review = ({ ...wizardProps }: ReviewProps) => {
  const { t } = useTranslation();
  const { classes } = useStyles();

  return (
    <Flex className={classes.reviewContainer}>
      <Title order={4}>{t('wizard.users.review.title')}</Title>
      <Accordion
        className={classes.contentContainer}
        defaultValue="general"
        chevron={<PlusCircleIcon className="icon" size={20} />}
      >
        <General {...wizardProps} />
        <Type {...wizardProps} />
        <AccessControl {...wizardProps} />
        <Credentials {...wizardProps} />
      </Accordion>
    </Flex>
  );
};

export default memo(Review);
