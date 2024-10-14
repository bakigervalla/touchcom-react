import { Badge, Flex, Text, Title } from '@mantine/core';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { DeviceInfo } from '@/common/models';
import { status, type } from '@/common/utils';

import useStyles from './useStyles';

interface InfoCardProps {
  data: DeviceInfo;
}

const InfoCard = ({ data }: InfoCardProps) => {
  const { t } = useTranslation();
  const { classes } = useStyles();

  return (
    <Flex className={classes.infoCardContainer}>
      <Flex>
        <Flex direction="column" gap={10}>
          <Title order={2}>{data.total}</Title>
          <Text>{t('page.dashboard.devices')}</Text>
        </Flex>
        <Badge ml="auto" variant={status.getStatusVariant(data.status)}>
          {t(status.getFormattedStatusName(data.status))}
        </Badge>
      </Flex>
      <Flex mt="auto">
        {data.deviceTypeStatistics.map((typeStatistics) => (
          <Badge
            key={typeStatistics.type}
            variant="dot"
            className={classes.badge}
            sx={{
              '&::before': {
                background: type.getColorByType(typeStatistics.type),
              },
            }}
          >
            {typeStatistics.total}{' '}
            {t(type.getFormattedTypeName(typeStatistics.type))}
          </Badge>
        ))}
      </Flex>
    </Flex>
  );
};

export default memo(InfoCard);
