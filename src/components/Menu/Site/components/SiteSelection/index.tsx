import { Avatar, Flex, Text } from '@mantine/core';
import React, { memo } from 'react';
import { useRecoilValue } from 'recoil';

import { auth, site } from '@/data';

import { placeholders } from '@/common/constants';

import useStyles from './useStyles';

const SiteSelection = () => {
  const { classes } = useStyles();
  const { changeActiveSite } = auth.actions();
  const sitesWithoutActiveSite = useRecoilValue(
    site.state.sitesWithoutActiveSite,
  );

  return (
    <Flex direction="column">
      {sitesWithoutActiveSite.map((site) => (
        <Flex
          key={site.id}
          className={classes.itemContainer}
          onClick={() => changeActiveSite(site.id)}
        >
          <Avatar
            className="image"
            src={
              site.imageUrl ||
              `${placeholders.IMAGE_PLACEHOLDERS_URL}/${placeholders.SITE_PLACEHOLDER.SITE_A}`
            }
          />
          <Text className="text">{site.name}</Text>
        </Flex>
      ))}
    </Flex>
  );
};

export default memo(SiteSelection);
