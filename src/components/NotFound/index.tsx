import { Flex, Text, clsx } from '@mantine/core';
import React, { ComponentType, memo } from 'react';
import { useTranslation } from 'react-i18next';

import useStyles from './useStyles';

interface NotFoundProps {
  Icon: ComponentType<any>;
  label: string;
  description?: string;
  className?: {
    container?: string;
    icon?: string;
    label?: string;
    description?: string;
  };
}

const NotFound = ({ Icon, label, description, className }: NotFoundProps) => {
  const { t } = useTranslation();
  const { classes } = useStyles();

  return (
    <Flex className={clsx(classes.container, className && className.container)}>
      <Icon
        size={64}
        className={clsx(classes.icon, className && className.icon)}
      />
      <Flex direction="column" align="center" gap={8}>
        <Text className={clsx(classes.label, className && className.label)}>
          {t(label)}
        </Text>
        {description && (
          <Text
            variant="subtitle"
            className={clsx(
              classes.description,
              className && className.description,
            )}
          >
            {t(description)}
          </Text>
        )}
      </Flex>
    </Flex>
  );
};

NotFound.defaultProps = {
  className: {},
  description: '',
};

export default memo(NotFound);
