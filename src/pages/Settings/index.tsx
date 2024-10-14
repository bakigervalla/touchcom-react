import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Layouts, Navigation } from '@/components';

const Settings = () => {
  const { t } = useTranslation();

  return (
    <Layouts.Page
      navbarChildren={
        <Navigation.Navbar.Wrapper labels={[t('page.settings.title')]} />
      }
    >
      {t('page.settings.title')}
    </Layouts.Page>
  );
};

export default memo(Settings);
