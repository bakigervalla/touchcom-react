import { Box, Popover } from '@mantine/core';
import { debounce as _debounce } from 'lodash';
import React, { memo, useState } from 'react';

import { SearchResult } from '@/common/models';

import Input from '../Input';

import { SearchResults } from './components';
import useStyles from './useStyles';

interface PopoverSearchProps {
  searchResults: SearchResult[];
  action: (search: string) => void;
  handleSearchResultClick: (item: SearchResult) => void;
  classNames?: string;
  placeholder?: string;
}

const PopoverSearch = ({
  action,
  placeholder,
  classNames,
  searchResults,
  handleSearchResultClick,
}: PopoverSearchProps) => {
  const { classes } = useStyles();
  const [isSearchHistoryOpened, setIsSearchHistoryOpened] = useState(false);

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
            placeholder={placeholder}
            action={action}
            onClose={() => setIsSearchHistoryOpened(false)}
          />
        </Box>
      </Popover.Target>
      <Popover.Dropdown className={classes.searchResultsDropdownContainer}>
        <SearchResults
          data={searchResults}
          handleClick={handleSearchResultClick}
        />
      </Popover.Dropdown>
    </Popover>
  );
};

PopoverSearch.defaultProps = {
  classNames: '',
  placeholder: '',
};

export default memo(PopoverSearch);
