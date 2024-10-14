import { Flex } from '@mantine/core';
import React, { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';

import { DynamicDataContainer, Loaders } from '@/components';
import { accessLevel } from '@/data';

import { pagination as paginationConstants } from '@/common/constants';
import { AccessLevel } from '@/common/models';

import columns from './columns';
import useStyles from './useStyles';

interface SavedAccessLevelsProps {
  handleNewAccessLevelClick: () => void;
  handleAccessLevelClick: (accessLevel: Partial<AccessLevel>) => void;
  activeAccessLevel: Partial<AccessLevel> | null;
}

const SavedAccessLevels = ({
  activeAccessLevel,
  handleAccessLevelClick,
  handleNewAccessLevelClick,
}: SavedAccessLevelsProps) => {
  const { t } = useTranslation();
  const { classes } = useStyles();
  const [currentPage] = useState(paginationConstants.DEFAULT_PAGE);
  const { getAccessLevels, updateAccessLevel } = accessLevel.actions();
  const { accessLevels, areAccessLevelsLoading } = useRecoilValue(
    accessLevel.state.accessLevelAtom,
  );

  useEffect(() => {
    getAccessLevels({
      page: currentPage,
      pageSize: paginationConstants.ACCESS_LEVELS.PAGE_SIZE,
    });
  }, [currentPage, getAccessLevels]);

  return (
    <Flex className={classes.savedAccessLevelsContainer}>
      <Flex className="newAccessLevelContainer">
        <DynamicDataContainer<{ id: number; label: string }>
          onClick={handleNewAccessLevelClick}
          columns={columns.newAccessLevel}
          data={[{ id: 1, label: t('page.accessLevels.newAccessLevel') }]}
        />
      </Flex>
      {areAccessLevelsLoading || !accessLevels ? (
        <Flex pos="relative" h="100%">
          <Loaders.Overlay />
        </Flex>
      ) : (
        <Flex className={classes.accessLevelsList}>
          <DynamicDataContainer<AccessLevel>
            showInfoColor
            data={accessLevels}
            columns={columns.accessLevel(updateAccessLevel, classes, t)}
            onClick={handleAccessLevelClick}
            isSelected={(item) =>
              !!activeAccessLevel && item.id === activeAccessLevel.id
            }
          />
        </Flex>
      )}
    </Flex>
  );
};

export default memo(SavedAccessLevels);
