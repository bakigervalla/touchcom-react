import React, { memo, useEffect } from 'react';
import { useResetRecoilState } from 'recoil';

import { Layouts } from '@/components';
import { site } from '@/data';

import { LoginForm } from './components';

const Login = () => {
  const resetSitesState = useResetRecoilState(site.state.siteAtom);

  useEffect(
    () => () => {
      resetSitesState();
    },
    [resetSitesState],
  );

  return (
    <Layouts.Auth>
      <LoginForm />
    </Layouts.Auth>
  );
};

export default memo(Login);
