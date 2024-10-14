import { Box, Button, Text } from '@mantine/core';
import React, { memo } from 'react';

import useStyles from './useStyles';

interface ActionsProps {
  actions: {
    label: string;
    type: 'button' | 'submit' | 'reset' | undefined;
    action: () => void;
  }[];
}

const Actions = ({ actions }: ActionsProps) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.navbarActionsContainer}>
      {actions.map((action) => (
        <Button key={action.label} type={action.type} onClick={action.action}>
          <Text className={classes.navbarActionButtonLabel}>
            {action.label}
          </Text>
        </Button>
      ))}
    </Box>
  );
};

export default memo(Actions);
