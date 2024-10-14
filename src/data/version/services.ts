import { useFetchWrapper } from '@/hooks';

import { paths } from '@/common/constants';

const useVersionServices = () => {
  const api = useFetchWrapper();

  const getVersions = () => api.get(paths.API.VERSIONS, {});

  return {
    getVersions,
  };
};

export default useVersionServices;
