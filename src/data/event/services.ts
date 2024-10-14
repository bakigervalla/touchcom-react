import { useFetchWrapper } from '@/hooks';

import { paths } from '@/common/constants';

import { EventTrigger } from './interfaces';

const useEventServices = () => {
  const api = useFetchWrapper();

  const eventHandler = (payload: EventTrigger) =>
    api.post(paths.API.MQTT_EVENT_HANDLER, { json: payload });

  return {
    eventHandler,
  };
};

export default useEventServices;
