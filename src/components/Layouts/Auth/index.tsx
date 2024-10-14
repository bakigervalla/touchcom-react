import { Box, Flex } from '@mantine/core';
import React, { ReactNode, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { LogoDark } from '@/icons';

import Language from '@/components/Language';

import useStyles from './useStyles';

interface AuthProps {
  children: ReactNode;
}

const Auth = ({ children }: AuthProps) => {
  const { t } = useTranslation();
  const { classes } = useStyles();

  return (
    <Flex className={classes.authContainer}>
      <Flex className={classes.authHeader}>
        <LogoDark className="logo" />
        <Language.Switch />
      </Flex>
      <Box className={classes.authContent}>{children}</Box>
      <Flex className={classes.authFooter}>
        <Link
          to="https://www.touchcom.no/personvern"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('layouts.auth.privacyPolicy')}
        </Link>
      </Flex>
    </Flex>
  );
};

export default memo(Auth);
