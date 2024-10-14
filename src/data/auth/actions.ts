import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { paths } from '@/common/constants';
import { BackendError } from '@/common/errors';
import { Token, User } from '@/common/models';

import app from '../app';

import useAuthServices from './services';
import state from './state';

const useAuthActions = () => {
  const navigate = useNavigate();
  const service = useAuthServices();
  const { showErrorMessage } = app.actions();
  const setAuth = useSetRecoilState(state.authAtom);

  const login = (data: any) => {
    service
      .login(data)
      .then((response: Token) => {
        const { accessToken, refreshToken } = response;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        const user: User = jwtDecode(accessToken);
        setAuth((prev) => ({ ...prev, user, accessToken, refreshToken }));
      })
      .catch((error: BackendError) => showErrorMessage(error.message));
  };

  const refreshAuthToken = (data: any) => {
    service
      .refreshAuthToken(data)
      .then((response: Token) => {
        const { accessToken, refreshToken } = response;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        const user: User = jwtDecode(accessToken);
        setAuth((prev) => ({ ...prev, user, accessToken, refreshToken }));
      })
      .catch((error: BackendError) => showErrorMessage(error.message));
  };

  const forgotPassword = (data: any) => {
    service
      .forgotPassword(data)
      .then(() => navigate(paths.LOGIN))
      .catch((error: BackendError) => showErrorMessage(error.message));
  };

  const resetPassword = (data: any) => {
    service
      .resetPassword(data)
      .then(() => navigate(paths.LOGIN))
      .catch((error: BackendError) => showErrorMessage(error.message));
  };

  const changeActiveSite = (siteId: number) => {
    service
      .changeActiveSite(siteId)
      .then((response: Token) => {
        const { accessToken, refreshToken } = response;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        const user: User = jwtDecode(accessToken);
        setAuth((prev) => ({ ...prev, user, accessToken, refreshToken }));
        navigate(paths.DASHBOARD);
      })
      .catch((error: BackendError) => showErrorMessage(error.message));
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setAuth({ user: null, accessToken: null, refreshToken: null });
  };

  return {
    forgotPassword,
    login,
    logout,
    refreshAuthToken,
    resetPassword,
    changeActiveSite,
  };
};

export default useAuthActions;
