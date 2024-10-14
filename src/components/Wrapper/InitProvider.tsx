import jwtDecode from 'jwt-decode';
import { ReactElement, memo, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { auth } from '@/data';

import { User } from '@/common/models';

interface InitProviderProps {
  children: ReactElement;
}

const InitProvider = ({ children }: InitProviderProps) => {
  const setAuth = useSetRecoilState(auth.state.authAtom);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (accessToken) {
      const user: User = jwtDecode(accessToken);
      setAuth((prev) => ({ ...prev, user, accessToken, refreshToken }));
    }
  }, [setAuth]);

  return children;
};

export default memo(InitProvider);
