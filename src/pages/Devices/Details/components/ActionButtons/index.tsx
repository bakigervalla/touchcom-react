import { Button, Flex, clsx } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';

import { ConfirmationDialog } from '@/components';
import { device } from '@/data';

import { Device, DeviceStatus } from '@/common/models';

import useStyles from './useStyles';

const DUMMY_SERIAL_NUMBER_CHARACTER = '-';
enum DialogType {
  REJECT = 'REJECT',
  APPROVE = 'APPROVE',
  ACTIVATE = 'ACTIVATE',
  REBOOT = 'REBOOT',
  DELETE = 'DELETE',
}
const DIALOG_TYPE = {
  REJECT: {
    ID: 'REJECT',
    TEXT: 'dialogs.devices.reject.confirmationText',
    TITLE: 'dialogs.devices.reject.confirmationTitle',
  },
  APPROVE: {
    ID: 'APPROVE',
    TEXT: 'dialogs.devices.approve.confirmationText',
    TITLE: 'dialogs.devices.approve.confirmationTitle',
  },
  ACTIVATE: {
    ID: 'ACTIVATE',
    TEXT: 'dialogs.devices.activate.confirmationText',
    TITLE: 'dialogs.devices.activate.confirmationTitle',
  },
  REBOOT: {
    ID: 'REBOOT',
    TEXT: 'dialogs.devices.reboot.confirmationText',
    TITLE: 'dialogs.devices.reboot.confirmationTitle',
  },
  DELETE: {
    ID: 'DELETE',
    TEXT: 'dialogs.devices.delete.confirmationText',
    TITLE: 'dialogs.devices.delete.confirmationTitle',
  },
};

interface DialogDefaultState {
  title: string;
  text: string;
  action: () => void;
}

const ActionButtons = () => {
  const { t } = useTranslation();
  const { classes } = useStyles();
  const [opened, { toggle, close }] = useDisclosure(false);
  const [activeDialog, setActiveDialog] = useState<DialogDefaultState>({
    title: '',
    text: '',
    action: () => null,
  });
  const { registrationVerification, activate, reset, remove } =
    device.actions();
  const { device: deviceData } = useRecoilValue(device.state.deviceAtom);

  const handleOpenDialog = useCallback(
    (type: DialogType) => {
      switch (type) {
        case DialogType.REJECT:
          setActiveDialog({
            title: DIALOG_TYPE[DialogType.REJECT].TITLE,
            text: DIALOG_TYPE[DialogType.REJECT].TEXT,
            action: () => {
              registrationVerification({
                device: deviceData as Device,
                user: (deviceData as Device).accessControls[0].user,
                isApproved: false,
              });
              close();
            },
          });
          break;
        case DialogType.APPROVE:
          setActiveDialog({
            title: DIALOG_TYPE[DialogType.APPROVE].TITLE,
            text: DIALOG_TYPE[DialogType.APPROVE].TEXT,
            action: () => {
              registrationVerification({
                device: deviceData as Device,
                user: (deviceData as Device).accessControls[0].user,
                isApproved: true,
              });
              close();
            },
          });
          break;
        case DialogType.ACTIVATE:
          setActiveDialog({
            title: DIALOG_TYPE[DialogType.ACTIVATE].TITLE,
            text: DIALOG_TYPE[DialogType.ACTIVATE].TEXT,
            action: () => {
              activate((deviceData as Device).id);
              close();
            },
          });
          break;
        case DialogType.REBOOT:
          setActiveDialog({
            title: DIALOG_TYPE[DialogType.REBOOT].TITLE,
            text: DIALOG_TYPE[DialogType.REBOOT].TEXT,
            action: () => {
              reset((deviceData as Device).id);
              close();
            },
          });
          break;
        case DialogType.DELETE:
          setActiveDialog({
            title: DIALOG_TYPE[DialogType.DELETE].TITLE,
            text: DIALOG_TYPE[DialogType.DELETE].TEXT,
            action: () => {
              remove((deviceData as Device).id);
              close();
            },
          });
          break;
        default:
          setActiveDialog({
            title: DIALOG_TYPE[DialogType.DELETE].TITLE,
            text: DIALOG_TYPE[DialogType.DELETE].TEXT,
            action: () => {
              remove((deviceData as Device).id);
              close();
            },
          });
          break;
      }
      toggle();
    },
    [
      toggle,
      deviceData,
      registrationVerification,
      activate,
      reset,
      remove,
      close,
    ],
  );

  if (deviceData?.status === DeviceStatus.REGISTRATION_IN_REVIEW) {
    return (
      <Flex className={classes.buttonsContainer}>
        <Button
          className={clsx('button', 'approve')}
          onClick={() => handleOpenDialog(DialogType.APPROVE)}
          disabled={deviceData.serialNumber.includes(
            DUMMY_SERIAL_NUMBER_CHARACTER,
          )}
        >
          {t('common.approve')}
        </Button>
        <Button
          className={clsx('button', 'reject')}
          onClick={() => handleOpenDialog(DialogType.REJECT)}
          disabled={deviceData.serialNumber.includes(
            DUMMY_SERIAL_NUMBER_CHARACTER,
          )}
        >
          {t('common.reject')}
        </Button>
      </Flex>
    );
  }

  return (
    <Flex className={classes.buttonsContainer}>
      <Button
        className="button"
        onClick={() => handleOpenDialog(DialogType.ACTIVATE)}
        disabled={
          deviceData?.status === DeviceStatus.ACTIVE ||
          deviceData?.serialNumber.includes(DUMMY_SERIAL_NUMBER_CHARACTER)
        }
      >
        {t('common.activate')}
      </Button>
      <Button
        className="button"
        onClick={() => handleOpenDialog(DialogType.REBOOT)}
        disabled={
          deviceData?.status !== DeviceStatus.ACTIVE ||
          deviceData?.serialNumber.includes(DUMMY_SERIAL_NUMBER_CHARACTER)
        }
      >
        {t('common.reboot')}
      </Button>
      <Button
        variant="neutral"
        className="button"
        onClick={() => handleOpenDialog(DialogType.DELETE)}
        disabled={deviceData?.serialNumber.includes(
          DUMMY_SERIAL_NUMBER_CHARACTER,
        )}
      >
        {t('common.delete')}
      </Button>
      <ConfirmationDialog
        isOpened={opened}
        positiveButtonText={t('common.confirm')}
        negativeButtonText={t('common.cancel')}
        text={t(activeDialog.text)}
        title={t(activeDialog.title)}
        negativeButtonClick={close}
        positiveButtonClick={activeDialog.action}
      />
    </Flex>
  );
};

export default memo(ActionButtons);
