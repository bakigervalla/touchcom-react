import { Flex } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { SnackbarKey, SnackbarProvider } from 'notistack';
import React, { ReactNode, memo } from 'react';

import { app } from '@/data';

import useStyles from './useStyles';

interface ProviderProps {
  children: ReactNode;
}

const Provider = ({ children }: ProviderProps) => {
  const { classes } = useStyles();
  const { removeSnackbar } = app.actions();

  return (
    <SnackbarProvider
      className={classes.snackbar}
      action={(key: SnackbarKey) => (
        <Flex className="iconContainer">
          <IconX onClick={() => removeSnackbar(key)} />
        </Flex>
      )}
      maxSnack={3}
    >
      {children}
    </SnackbarProvider>
  );
};

export default memo(Provider);
