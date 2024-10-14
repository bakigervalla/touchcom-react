/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import ky, { KyResponse, Options } from 'ky';
import { useNavigate } from 'react-router-dom';

import config from '@/config';

import { paths } from '@/common/constants';
import { BackendError } from '@/common/errors';

const useFetchWrapper = () => {
  const navigate = useNavigate();

  const getAccessToken = () => localStorage.getItem('accessToken') || '';

  const getBearerToken = () => `Bearer ${getAccessToken()}`;

  const forceLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  const authHeader = () => {
    const isLoggedIn = !!getAccessToken();
    return isLoggedIn ? { Authorization: getBearerToken() } : {};
  };

  const handleResponse = (response: KyResponse) =>
    response.text().then((text: string) => {
      const data = text && JSON.parse(text);

      if (!response.ok) {
        if ([401, 403].includes(response.status) && getAccessToken()) {
          forceLogout();
        }

        data.httpErrorCode = response.status;
        data.httpErrorType = response.statusText;
        return Promise.reject(data);
      }

      return data;
    });

  const request = (method: string) => (url: string, options: Options) => {
    const extendedOptions = {
      ...options,
      method,
      prefixUrl: options.prefixUrl || config.apiUrl,
      headers: { ...options.headers, ...authHeader() },
      throwHttpErrors: false,
    };
    return ky(url, extendedOptions)
      .then(handleResponse)
      .catch((error: BackendError) => {
        if (error.statusCode === 401) {
          forceLogout();
          navigate(paths.LOGIN);
        }

        throw new BackendError(error);
      });
  };

  return {
    get: request('get'),
    post: request('post'),
    put: request('put'),
    patch: request('patch'),
    delete: request('delete'),
  };
};

export default useFetchWrapper;
