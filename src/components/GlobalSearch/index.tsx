import { Box, Popover } from '@mantine/core';
import { debounce as _debounce } from 'lodash';
import React, { memo, useState } from 'react';

import Input from '../Input';

import { SearchHistory } from './components';
import useStyles from './useStyles';

interface SearchProps {
  action: (search: string) => void;
  classNames?: string;
}

const GlobalSearch = ({ action, classNames }: SearchProps) => {
  const { classes } = useStyles();
  const [isSearchHistoryOpened, setIsSearchHistoryOpened] = useState(false);

  return (
    <Popover
      opened={isSearchHistoryOpened}
      shadow="xs"
      position="bottom-end"
      onChange={(opened) => setIsSearchHistoryOpened(opened)}
    >
      <Popover.Target>
        <Box
          className={classNames}
          onFocusCapture={() => setIsSearchHistoryOpened(true)}
        >
          <Input.Search
            action={action}
            onClose={() => setIsSearchHistoryOpened(false)}
          />
        </Box>
      </Popover.Target>
      <Popover.Dropdown className={classes.searchHistoryDropdownContainer}>
        <SearchHistory />
      </Popover.Dropdown>
    </Popover>
  );
};

GlobalSearch.defaultProps = {
  classNames: '',
};

export default memo(GlobalSearch);
