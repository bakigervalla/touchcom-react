import { useRecoilCallback } from 'recoil';

import { BackendError } from '@/common/errors';
import { Country } from '@/common/models';

import app from '../app';

import useCountryServices from './services';
import state from './state';

const useCountryActions = () => {
  const service = useCountryServices();
  const { showErrorMessage } = app.actions();

  const getCountries = useRecoilCallback(
    ({ set }) =>
      () => {
        set(state.countryAtom, (prev) => ({
          ...prev,
          areCountriesLoading: true,
        }));
        service
          .getCountries()
          .then((response: Country[]) => {
            set(state.countryAtom, (prev) => ({
              ...prev,
              countries: response,
              areCountriesLoading: false,
            }));
          })
          .catch((error: BackendError) => {
            set(state.countryAtom, (prev) => ({
              ...prev,
              areCountriesLoading: false,
            }));

            showErrorMessage(error.message);
          });
      },
    [],
  );

  return { getCountries };
};

export default useCountryActions;
