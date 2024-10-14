import { Box, Breadcrumbs, Text } from '@mantine/core';
import React, { ReactNode, memo } from 'react';

import { ArrowDownIcon } from '@/icons';

import useStyles from './useStyles';

interface TitleProps {
  subtitle?: ReactNode;
  labels: string[];
  titleDecoration?: string;
}

const Title = ({ labels, titleDecoration, subtitle }: TitleProps) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.navbarTitleContainer}>
      <Box className={classes.titleContainer}>
        <Breadcrumbs separator={<ArrowDownIcon size={12} className="icon" />}>
          {labels.map((label) => (
            <Text
              truncate
              key={label}
              className={classes.navbarTitle}
              style={{ maxWidth: titleDecoration ? '35%' : '100%' }}
            >
              {label}
            </Text>
          ))}
        </Breadcrumbs>
        {titleDecoration && (
          <Text className={classes.titleDecoration} truncate>
            {titleDecoration}
          </Text>
        )}
      </Box>
      {subtitle}
    </Box>
  );
};

Title.defaultProps = {
  subtitle: undefined,
  titleDecoration: undefined,
};

export default memo(Title);
