import {
  OptionsObject,
  SnackbarKey,
  SnackbarMessage,
  closeSnackbar,
  enqueueSnackbar,
} from 'notistack';
import { useSetRecoilState } from 'recoil';

import state from './state';

export interface SnackbarNotification {
  message: SnackbarMessage;
  options: OptionsObject;
}

const useSnackbarActions = () => {
  const setApp = useSetRecoilState(state.appAtom);

  const removeSnackbar = (key: SnackbarKey) => {
    closeSnackbar(key);
    setApp((prev) => ({
      snackbarKeys: prev.snackbarKeys.filter(
        (snackbarKey) => snackbarKey !== key,
      ),
    }));
  };

  const enqueue = (notification: SnackbarNotification): SnackbarKey =>
    enqueueSnackbar(notification.message, {
      ...notification.options,
      key: new Date().getTime() + Math.random(),
      onClose: (event, reason, key) => {
        if (notification.options.onClose) {
          notification.options.onClose(event, reason, key);
        }
      },
      onExited: (event, key) => removeSnackbar(key),
    });

  const showSuccessMessage = (message: SnackbarMessage) => {
    const key: SnackbarKey = enqueue({
      message,
      options: {
        variant: 'success',
      },
    });
    setApp((prev) => ({
      snackbarKeys: [...prev.snackbarKeys, key],
    }));
  };

  const showWarningMessage = (message: SnackbarMessage) => {
    const key = enqueue({
      message,
      options: {
        variant: 'warning',
      },
    });
    setApp((prev) => ({
      snackbarKeys: [...prev.snackbarKeys, key],
    }));
  };

  const showErrorMessage = (message: SnackbarMessage) => {
    const key = enqueue({
      message,
      options: {
        variant: 'error',
      },
    });
    setApp((prev) => ({
      snackbarKeys: [...prev.snackbarKeys, key],
    }));
  };

  const showInfoMessage = (message: SnackbarMessage) => {
    const key = enqueue({
      message,
      options: {
        variant: 'info',
      },
    });
    setApp((prev) => ({
      snackbarKeys: [...prev.snackbarKeys, key],
    }));
  };

  return {
    enqueueSnackbar,
    removeSnackbar,
    showErrorMessage,
    showInfoMessage,
    showSuccessMessage,
    showWarningMessage,
  };
};

export default useSnackbarActions;
