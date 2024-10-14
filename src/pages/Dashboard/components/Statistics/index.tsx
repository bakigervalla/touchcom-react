import { Box, Button, Flex, clsx } from '@mantine/core';
import React, { memo, useEffect, useMemo, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';

import { EventFilter, NotFound } from '@/components';
import { statistics } from '@/data';
import { ArrowDownIcon, FilterIcon, NotFoundDeviceIcon } from '@/icons';

import chart from './chart';
import useStyles from './useStyles';

const Statistics = () => {
  const { t } = useTranslation();
  const { classes } = useStyles();
  const [gradient, setGradient] = useState<CanvasGradient>(
    {} as CanvasGradient,
  );
  const { statistics: statisticsData } = useRecoilValue(
    statistics.state.statisticsAtom,
  );

  const PERIOD_FILTERS = useMemo(
    () => [
      {
        id: 1,
        key: 'TODAY',
        label: t('page.dashboard.filters.today'),
        value: 6,
      },
      {
        id: 2,
        key: 'WEEK',
        label: t('page.dashboard.filters.thisWeek'),
        value: 57,
      },
      {
        id: 3,
        key: 'MONTH',
        label: t('page.dashboard.filters.thisMonth'),
        value: 225,
      },
      {
        id: 4,
        key: 'YEAR',
        label: t('page.dashboard.filters.wholeYear'),
        value: 5525,
      },
    ],
    [t],
  );

  useEffect(() => {
    if (statisticsData.visitors.length <= 0) {
      return;
    }

    const canvas = document.getElementById('chart') as HTMLCanvasElement;
    const context = canvas.getContext('2d');

    if (context) {
      const gradient = context.createLinearGradient(250, -395, 250, 320);
      gradient.addColorStop(0, '#FF671D');
      gradient.addColorStop(1, 'rgba(255, 103, 29, 0.04)');
      setGradient(gradient);
    }
  }, [statisticsData]);

  return statisticsData.visitors.length > 0 ? (
    <Flex className={classes.statisticsContainer}>
      <EventFilter items={PERIOD_FILTERS} onClick={() => null} />
      <Flex>
        <Button
          variant="filter"
          className={clsx(classes.button, 'filter')}
          leftIcon={<FilterIcon size={18} />}
          rightIcon={<ArrowDownIcon size={16} />}
        >
          {t('common.filter')}
        </Button>
        <Button className={classes.button} ml="auto">
          {t('common.report')}
        </Button>
      </Flex>
      <Box h="420px">
        <Line
          id="chart"
          data={{
            labels: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00'],
            datasets: [
              {
                label: 'Dataset',
                data: [14, 2, 2, 17, 15, 6],
                borderColor: '#DB4915',
                borderWidth: 1,
                pointStyle: false,
                backgroundColor: gradient,
                fill: 'start',
              },
            ],
          }}
          options={chart.options}
        />
      </Box>
    </Flex>
  ) : (
    <NotFound
      label="notFound.statistics.label"
      description="notFound.statistics.description"
      Icon={NotFoundDeviceIcon}
      className={{ container: classes.notFoundContainer }}
    />
  );
};

export default memo(Statistics);
