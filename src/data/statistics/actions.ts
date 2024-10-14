import { useRecoilCallback } from 'recoil';

import { BackendError } from '@/common/errors';
import { Statistics } from '@/common/models';

import app from '../app';

import useStatisticsServices from './services';
import state from './state';

const useStatisticsActions = () => {
  const service = useStatisticsServices();
  const { showErrorMessage } = app.actions();

  const getStatistics = useRecoilCallback(
    ({ set }) =>
      () => {
        service
          .getStatistics()
          .then((response: Statistics) => {
            set(state.statisticsAtom, (prev) => ({
              ...prev,
              statistics: response,
              areStatisticsLoading: false,
            }));
          })
          .catch((error: BackendError) => {
            set(state.statisticsAtom, (prev) => ({
              ...prev,
              areStatisticsLoading: false,
            }));
            showErrorMessage(error.message);
          });
      },
    [],
  );

  return { getStatistics };
};

export default useStatisticsActions;
