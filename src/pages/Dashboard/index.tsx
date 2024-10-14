import { Flex, Title } from '@mantine/core';
import { isEmpty as _isEmpty } from 'lodash';
import React, { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';

import { Layouts, Loaders, Navigation } from '@/components';
import { auth, statistics } from '@/data';

import { common } from '@/common/utils';

import { InfoCard, LastActions, Statistics } from './components';
import useStyles from './useStyles';

const Dashboard = () => {
  const { t } = useTranslation();
  const { classes } = useStyles();
  const { getStatistics } = statistics.actions();
  const { user } = useRecoilValue(auth.state.authAtom);
  const { statistics: statisticsData, areStatisticsLoading } = useRecoilValue(
    statistics.state.statisticsAtom,
  );

  useEffect(() => {
    getStatistics();
  }, [getStatistics]);

  return (
    <Layouts.Page
      navbarChildren={
        <Navigation.Navbar.Wrapper labels={[t('page.dashboard.title')]} />
      }
      childrenClassNames={classes.dashboardPageLayout}
    >
      <Title order={3}>
        {t('page.dashboard.header', {
          name: common.getUserFullName(user),
        })}
      </Title>
      {areStatisticsLoading || _isEmpty(statisticsData) ? (
        <Loaders.Overlay />
      ) : (
        <Flex className={classes.contentContainer}>
          <Flex className={classes.infoSection}>
            {statisticsData.devicesInfo.map((deviceInfo) => (
              <InfoCard key={deviceInfo.status} data={deviceInfo} />
            ))}
          </Flex>
          <Flex className={classes.overviewSection}>
            <Flex className={classes.statisticsSection}>
              <Title order={5}>{t('page.dashboard.visitsStatistics')}</Title>
              <Statistics />
            </Flex>
            <Flex className={classes.lastActionsSection}>
              <Title order={5}>{t('page.dashboard.lastActions')}</Title>
              <LastActions />
            </Flex>
          </Flex>
        </Flex>
      )}
    </Layouts.Page>
  );
};

export default memo(Dashboard);
