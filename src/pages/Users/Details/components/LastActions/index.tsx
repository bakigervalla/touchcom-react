/* eslint-disable react/no-array-index-key */
import { Avatar, Badge, Flex, Text, Title } from '@mantine/core';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { NotFound } from '@/components';
import { LockIcon, NotFoundDeviceIcon } from '@/icons';

import useStyles from './useStyles';

const SHOW_LAST_ACTIONS = false;

const LastActions = () => {
  const { t } = useTranslation();
  const { classes } = useStyles();

  return (
    <Flex className={classes.lastActionsContainer}>
      <Title order={5}>{t('page.users.lastActions')}</Title>
      {SHOW_LAST_ACTIONS ? (
        Array(2)
          .fill(null)
          .map((_, index: number) => (
            <Flex key={index} gap={40}>
              <Avatar size="md" radius="xl">
                <LockIcon size={20} />
              </Avatar>
              <Flex direction="column" gap={8}>
                <Text variant="subtitle">11/20/2022, 11:24</Text>
                <Flex gap={5} align="center">
                  <Badge variant="info">Door {index + 1}</Badge>
                  <Text variant="subtitle">unlocked on the</Text>
                  <Text>2nd floor</Text>
                </Flex>
              </Flex>
            </Flex>
          ))
      ) : (
        <NotFound
          label="notFound.events.label"
          description="notFound.events.description"
          Icon={NotFoundDeviceIcon}
          className={{ container: classes.notFoundContainer }}
        />
      )}
    </Flex>
  );
};

export default memo(LastActions);
