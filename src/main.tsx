import { MantineProvider } from '@mantine/core';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js/auto';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';

import { Router } from '@/routes';

import './i18n';
import { mantineTheme } from './styles';

ChartJS.register(ArcElement, Tooltip, Legend);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <MantineProvider
        theme={mantineTheme.theme}
        withGlobalStyles
        withNormalizeCSS
      >
        <Router />
      </MantineProvider>
    </RecoilRoot>
  </React.StrictMode>,
);
