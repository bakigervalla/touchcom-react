/* eslint-disable react/no-array-index-key */
import { Avatar, Badge, Flex, Text } from '@mantine/core';
import React, { memo } from 'react';
import { useRecoilValue } from 'recoil';

import { NotFound } from '@/components';
import { statistics } from '@/data';
import { LockIcon, NotFoundExceptionIcon } from '@/icons';

import { placeholders } from '@/common/constants';

import useStyles from './useStyles';

const LastActions = () => {
  const { classes } = useStyles();
  const { statistics: statisticsData } = useRecoilValue(
    statistics.state.statisticsAtom,
  );

  return (
    <Flex className={classes.lastActionsContainer}>
      {statisticsData.events.length > 0 ? (
        Array(50)
          .fill(null)
          .map((_, index: number) => {
            const randomSelection = index % Math.floor(Math.random() * 4);
            return (
              <Flex key={index} gap={40}>
                <Avatar size="md" radius="xl">
                  <LockIcon size={20} />
                </Avatar>
                <Flex direction="column" gap={8} w="60%">
                  <Text variant="subtitle">11/20/2022, 11:24</Text>
                  <Flex gap={5} align="center" wrap="wrap">
                    <Avatar
                      src={`${placeholders.IMAGE_PLACEHOLDERS_URL}/${placeholders.SITE_PLACEHOLDER.SITE_A}`}
                      size="sm"
                      radius="xl"
                      alt="User image"
                    />
                    <Text>Jamie Laniester</Text>
                    <Text variant="subtitle">unlocked the</Text>
                    <Badge variant={randomSelection ? 'warning' : 'info'}>
                      {randomSelection
                        ? `Visitor Panel ${index + 1}`
                        : `Door ${index + 1}`}
                    </Badge>
                    <Text variant="subtitle">on the</Text>
                    <Text>2nd floor</Text>
                  </Flex>
                </Flex>
              </Flex>
            );
          })
      ) : (
        <NotFound
          label="notFound.actions.label"
          description="notFound.actions.description"
          Icon={NotFoundExceptionIcon}
          className={{ container: classes.notFoundContainer }}
        />
      )}
    </Flex>
  );
};

export default memo(LastActions);
