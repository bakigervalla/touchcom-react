import { Badge, Button, Flex } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { HistoryItem, NotFoundData } from '@/common/interfaces';

import AttachEntitySearch from '../AttachEntitySearch';
import NotFound from '../NotFound';

import useStyles from './useStyles';

interface AttachMultipleEntitiesProps {
  search: { notFound: NotFoundData; data: HistoryItem[]; placeholder: string };
  onSave: (items: HistoryItem[]) => void;
  handleSearch: (search: string) => void;
  createNewClick: () => void;
}

const AttachMultipleEntities = ({
  search,
  onSave,
  handleSearch,
  createNewClick,
}: AttachMultipleEntitiesProps) => {
  const { t } = useTranslation();
  const { classes } = useStyles();
  const [selectedItems, setSelectedItems] = useState<HistoryItem[]>([]);

  return (
    <Flex className={classes.attachMultipleEntitiesContainer}>
      <AttachEntitySearch
        notFound={search.notFound}
        action={handleSearch}
        onItemSelect={(item) =>
          setSelectedItems((prev) => [
            ...prev.filter((selectedItem) => selectedItem.id !== item.id),
            item,
          ])
        }
        data={search.data}
        placeholder={search.placeholder}
      />
      <Flex className={classes.selectionContainer}>
        {selectedItems.length > 0 ? (
          selectedItems.map((selectedItem) => (
            <Badge
              key={selectedItem.id}
              variant="filter"
              rightSection={
                <IconX
                  size={16}
                  onClick={() =>
                    setSelectedItems((prev) =>
                      prev.filter((item) => item.id !== selectedItem.id),
                    )
                  }
                />
              }
              className={classes.selectedItem}
            >
              {selectedItem.title}
            </Badge>
          ))
        ) : (
          <NotFound
            className={{
              icon: classes.notFoundIcon,
              container: classes.notFoundContainer,
              label: classes.notFoundLabel,
              description: classes.notFoundDescription,
            }}
            label={search.notFound.label}
            description={search.notFound.description}
            Icon={search.notFound.icon}
          />
        )}
      </Flex>
      <Flex className={classes.buttonsContainer}>
        <Button variant="neutral" className="button" onClick={createNewClick}>
          {t('buttons.createNew')}
        </Button>
        <Button
          variant="filled"
          className="button"
          onClick={() => onSave(selectedItems)}
        >
          {t('common.save')}
        </Button>
      </Flex>
    </Flex>
  );
};

export default memo(AttachMultipleEntities);
