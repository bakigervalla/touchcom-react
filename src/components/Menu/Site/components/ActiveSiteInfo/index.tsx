import { Avatar, Flex, Text, Title } from '@mantine/core';
import React, { memo } from 'react';
import { useRecoilValue } from 'recoil';

import { auth } from '@/data';
import { LocationIcon } from '@/icons';

import { placeholders } from '@/common/constants';

import useStyles from './useStyles';

const ActiveSiteInfo = () => {
  const { classes } = useStyles();
  const { user } = useRecoilValue(auth.state.authAtom);
  const userSiteLocation = useRecoilValue(auth.state.userSiteLocation);

  return (
    <Flex className={classes.activeSiteInfoContainer}>
      <Avatar
        className="image"
        src={
          user?.activeSite?.imageUrl ||
          `${placeholders.IMAGE_PLACEHOLDERS_URL}/${placeholders.SITE_PLACEHOLDER.SITE_A}`
        }
      />
      <Flex direction="column" gap={2}>
        <Title order={4} fw={700} align="center">
          {user?.activeSite?.name}
        </Title>
        <Flex className={classes.locationContainer}>
          <LocationIcon size={15} className="icon" />
          <Text className="text">{userSiteLocation}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default memo(ActiveSiteInfo);
