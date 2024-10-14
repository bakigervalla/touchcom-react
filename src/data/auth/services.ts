import { useFetchWrapper } from '@/hooks';

import { paths } from '@/common/constants';

const useAuthServices = () => {
  const api = useFetchWrapper();

  const login = (data: any) => api.post(paths.API.LOGIN, { json: data });

  const refreshAuthToken = (data: any) =>
    api.post(paths.API.REFRESH_TOKEN, { json: data });

  const forgotPassword = (data: any) =>
    api.post(paths.API.PASSWORD_RECOVERY_REQUEST, { json: data });

  const resetPassword = (data: any) =>
    api.post(paths.API.PASSWORD_RECOVERY_VERIFICATION, { json: data });

  const changeActiveSite = (siteId: number) =>
    api.post(paths.build(paths.API.SITES_ID_SELECT, siteId.toString()), {});

  return {
    changeActiveSite,
    forgotPassword,
    login,
    refreshAuthToken,
    resetPassword,
  };
};

export default useAuthServices;
