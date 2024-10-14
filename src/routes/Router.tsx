import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { Loaders, Wrapper } from '@/components';
import { auth } from '@/data';
import { Dashboard, Sites } from '@/pages';

import routes from './routes';

export const Router = () => {
  const { user } = useRecoilValue(auth.state.authAtom);

  return (
    <BrowserRouter>
      <Wrapper.ErrorBoundary>
        <Wrapper.InitProvider>
          <Suspense fallback={<Loaders.Overlay />}>
            <Wrapper.SnackbarProvider>
              <Routes>
                {routes.data.map((route) =>
                  route.component ? (
                    <Route
                      key={route.path}
                      id={route.name}
                      path={route.path}
                      element={
                        <Wrapper.Route
                          name={route.name}
                          component={route.component}
                          hideMenu={route.hideMenu}
                          isProtected={route.isProtected}
                          roles={route.roles}
                        />
                      }
                    />
                  ) : null,
                )}
                <Route
                  path="*"
                  element={
                    <Wrapper.Route
                      name={user && !user.activeSite ? 'Sites' : 'Dashboard'}
                      component={
                        user && !user.activeSite ? Sites.List : Dashboard
                      }
                      isProtected
                      hideMenu={!!(user && !user.activeSite)}
                    />
                  }
                />
              </Routes>
            </Wrapper.SnackbarProvider>
          </Suspense>
        </Wrapper.InitProvider>
      </Wrapper.ErrorBoundary>
    </BrowserRouter>
  );
};

export default Router;
