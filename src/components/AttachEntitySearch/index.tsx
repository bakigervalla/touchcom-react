import { Box, Popover } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { debounce as _debounce } from 'lodash';
import React, { memo, useCallback, useState } from 'react';

import { HistoryItem, NotFoundData } from '@/common/interfaces';

import Input from '../Input';

import { SearchHistory } from './components';
import useStyles from './useStyles';

interface SearchProps {
  data: HistoryItem[];
  notFound: NotFoundData;
  action: (search: string) => void;
  onItemSelect: (item: HistoryItem) => void;
  classNames?: string;
  placeholder?: string;
}

const AttachEntitySearch = ({
  action,
  onItemSelect,
  notFound,
  classNames,
  data,
  placeholder,
}: SearchProps) => {
  const { classes } = useStyles();
  const [isSearchHistoryOpened, setIsSearchHistoryOpened] = useState(false);

  const handleItemSelect = useCallback(
    (item: HistoryItem) => {
      setIsSearchHistoryOpened(false);
      onItemSelect(item);
    },
    [onItemSelect],
  );

  return (
    <Popover
      opened={isSearchHistoryOpened}
      shadow="xs"
      position="bottom-end"
      width="target"
      onChange={(opened) => setIsSearchHistoryOpened(opened)}
    >
      <Popover.Target>
        <Box
          className={classNames}
          onFocusCapture={() => setIsSearchHistoryOpened(true)}
        >
          <Input.Search
            Icon={IconPlus}
            placeholder={placeholder}
            action={action}
            onClose={() => setIsSearchHistoryOpened(false)}
          />
        </Box>
      </Popover.Target>
      <Popover.Dropdown className={classes.searchHistoryDropdownContainer}>
        <SearchHistory
          data={data}
          notFound={notFound}
          handleItemSelect={handleItemSelect}
        />
      </Popover.Dropdown>
    </Popover>
  );
};

AttachEntitySearch.defaultProps = {
  classNames: '',
  placeholder: 'buttons.attachDevice',
};

export default memo(AttachEntitySearch);
