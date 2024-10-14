import { useFetchWrapper } from '@/hooks';

import { paths } from '@/common/constants';

const useStatisticsServices = () => {
  const api = useFetchWrapper();

  const getStatistics = () => api.get(paths.API.STATISTICS, {});

  return {
    getStatistics,
  };
};

export default useStatisticsServices;
