import { useFetchWrapper } from '@/hooks';

import { paths } from '@/common/constants';

const useCountryServices = () => {
  const api = useFetchWrapper();

  const getCountries = () => api.get(paths.API.COUNTRIES, {});

  return {
    getCountries,
  };
};

export default useCountryServices;
