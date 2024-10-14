import { useRecoilCallback } from 'recoil';

import { BackendError } from '@/common/errors';
import { PaginatedVersion } from '@/common/models';

import app from '../app';

import useVersionServices from './services';
import state from './state';

const useVersionActions = () => {
  const service = useVersionServices();
  const { showErrorMessage } = app.actions();

  const getVersions = useRecoilCallback(
    ({ set }) =>
      () => {
        set(state.versionAtom, (prev) => ({
          ...prev,
          areVersionsLoading: true,
        }));
        service
          .getVersions()
          .then((response: PaginatedVersion) => {
            const { data, ...pagination } = response;
            set(state.versionAtom, (prev) => ({
              ...prev,
              versions: data,
              pagination,
              areVersionsLoading: false,
            }));
          })
          .catch((error: BackendError) => {
            set(state.versionAtom, (prev) => ({
              ...prev,
              areVersionsLoading: false,
            }));

            showErrorMessage(error.message);
          });
      },
    [],
  );

  return { getVersions };
};

export default useVersionActions;
