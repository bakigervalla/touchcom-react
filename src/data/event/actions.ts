import { useRecoilCallback } from 'recoil';

import { BackendError } from '@/common/errors';

import app from '../app';

import { EventTrigger } from './interfaces';
import useVersionServices from './services';

const useEventActions = () => {
  const service = useVersionServices();
  const { showErrorMessage, showSuccessMessage } = app.actions();

  const eventHandler = useRecoilCallback(
    () => (payload: EventTrigger) => {
      service
        .eventHandler(payload)
        .then(() => {
          showSuccessMessage(`Event (${payload.event}) triggered successfully`);
        })
        .catch((error: BackendError) => {
          showErrorMessage(error.message);
        });
    },
    [],
  );

  return { eventHandler };
};

export default useEventActions;
