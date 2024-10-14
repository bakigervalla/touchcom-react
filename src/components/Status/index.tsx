import { Badge, clsx } from '@mantine/core';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { status as statusUtils } from '@/common/utils';

import useStyles from './useStyles';

interface StatusProps {
  status: string;
  classNames?: string;
}

const Status = ({ status, classNames }: StatusProps) => {
  const { t } = useTranslation();
  const { classes } = useStyles();

  return (
    <Badge
      variant="dot"
      className={clsx(classes.status, classNames)}
      sx={{
        '&::before': { background: statusUtils.getColorByStatus(status) },
        color: statusUtils.getColorByStatus(status),
        textTransform: 'none',
      }}
    >
      {t(statusUtils.getFormattedStatusName(status))}
    </Badge>
  );
};

Status.defaultProps = {
  classNames: '',
};

export default memo(Status);
