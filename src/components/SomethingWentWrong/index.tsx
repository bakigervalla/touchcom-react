import { Box, Text } from '@mantine/core';
import React, { ErrorInfo, memo } from 'react';

import { LogoDark } from '@/icons';

import useStyles from './useStyles';

interface SomethingWentWrongProps {
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

const SomethingWentWrong = ({ error, errorInfo }: SomethingWentWrongProps) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.somethingWentWrongContainer}>
      <LogoDark className="logo" />
      <Text className={classes.title}>Something went wrong</Text>
      <Text variant="caption" className={classes.text}>
        {'Please contact us on '}
        <a href="mailto:post@touchcom.com" rel="noreferrer" target="_blank">
          post@touchcom.com
        </a>
        {' and share details screenshot information with us.'}
      </Text>
      <details className={classes.detailsContainer}>
        <Text className={classes.error}>{error && error.toString()}</Text>
        <Box className={classes.errorInfoContainer}>
          <Text>{errorInfo && errorInfo.componentStack}</Text>
        </Box>
      </details>
    </Box>
  );
};

export default memo(SomethingWentWrong);
