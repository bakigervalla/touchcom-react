import { Button, Flex, Modal, Text } from '@mantine/core';
import React, { memo } from 'react';

import { WarningIcon } from '@/icons';

import useStyles from './useStyles';

interface ConfirmationDialogProps {
  isOpened: boolean;
  negativeButtonText: string;
  positiveButtonText: string;
  negativeButtonClick: () => void;
  positiveButtonClick: () => void;
  title: string;
  text?: string;
}

const ConfirmationDialog = ({
  isOpened,
  negativeButtonClick,
  negativeButtonText,
  positiveButtonClick,
  positiveButtonText,
  title,
  text,
}: ConfirmationDialogProps) => {
  const { classes } = useStyles();

  return (
    <Modal
      opened={isOpened}
      title={title}
      variant=""
      onClose={negativeButtonClick}
      zIndex={201}
      centered
      className={classes.confirmationDialog}
    >
      <Flex className={classes.contentContainer} direction="column" gap={20}>
        <WarningIcon size={64} />
        {text && (
          <Text className={classes.confirmationDialogText} size="sm">
            {text}
          </Text>
        )}
      </Flex>
      <Flex className={classes.buttonsContainer}>
        <Button
          variant="neutral"
          className="button"
          onClick={negativeButtonClick}
        >
          {negativeButtonText}
        </Button>
        <Button
          variant="filled"
          className="button"
          onClick={positiveButtonClick}
        >
          {positiveButtonText}
        </Button>
      </Flex>
    </Modal>
  );
};

ConfirmationDialog.defaultProps = {
  text: undefined,
};

export default memo(ConfirmationDialog);
