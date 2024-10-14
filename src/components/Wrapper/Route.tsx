import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { auth } from '@/data';

import Loaders from '@/components/Loaders';
import Navigation from '@/components/Navigation';

import paths from '@/common/constants/paths';
import { Route } from '@/common/interfaces';
import authUtil from '@/common/utils/auth';

const Route = ({
  component: Component,
  hideMenu,
  isProtected,
  roles,
  name,
}: Pick<
  Route,
  'name' | 'component' | 'hideMenu' | 'isProtected' | 'roles'
>) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { user } = useRecoilValue(auth.state.authAtom);

  const isAuthenticated: boolean = useMemo(
    (): boolean =>
      !!localStorage.getItem('accessToken') &&
      !!user &&
      authUtil.hasOneRole(user, roles),
    [user, roles],
  );

  const getComponent = useCallback(
    () =>
      hideMenu ? (
        <Component />
      ) : (
        <Navigation.Root>
          <Component />
        </Navigation.Root>
      ),
    [hideMenu, Component],
  );

  useEffect(() => {
    document.title = t(name) || 'Touchcom Admin';
  }, [name, t]);

  if (!isProtected) {
    return isAuthenticated ? (
      <Navigate
        to={{
          pathname: user && !user.activeSite ? paths.SITES : paths.DASHBOARD,
        }}
      />
    ) : (
      <Component />
    );
  }

  if (!user && localStorage.getItem('accessToken')) {
    return <Loaders.Overlay />;
  }

  if (isAuthenticated && !user?.activeSite && pathname !== paths.SITES) {
    return <Navigate to={{ pathname: paths.SITES }} />;
  }

  return isAuthenticated ? (
    getComponent()
  ) : (
    <Navigate to={{ pathname: paths.LOGIN }} />
  );
};

export default memo(Route);
