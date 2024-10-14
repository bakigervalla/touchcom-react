/* eslint-disable react-hooks/exhaustive-deps */
import { TextInput, clsx } from '@mantine/core';
import { TablerIconsProps } from '@tabler/icons-react';
import { debounce as _debounce } from 'lodash';
import React, { ComponentType, memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useDebouncedInput } from '@/hooks';
import { CloseIcon, SearchIcon } from '@/icons';

import { IconProps } from '@/common/interfaces';

import useStyles from './useStyles';

interface SearchProps {
  action: (search: string) => void;
  classNames?: string;
  placeholder?: string;
  onClose?: () => void;
  Icon?: ComponentType<IconProps | TablerIconsProps>;
}

const Search = ({
  action,
  onClose,
  Icon,
  placeholder,
  classNames,
}: SearchProps) => {
  const { t } = useTranslation();
  const { classes } = useStyles();
  const [search, handleSearch, resetInput] = useDebouncedInput();

  const handleClose = useCallback(() => {
    resetInput();

    if (onClose) {
      onClose();
    }
  }, []);

  const debouncedGetData = useCallback(_debounce(action, 400), [action]);

  useEffect(() => {
    debouncedGetData(search);
  }, [search]);

  return (
    <TextInput
      className={clsx(classes.root, classNames)}
      variant="unstyled"
      onKeyDown={() => null}
      value={search}
      type="text"
      onChange={handleSearch}
      placeholder={t(placeholder || '')}
      {...(Icon
        ? {
            icon: <Icon size={18} className={classes.icon} />,
          }
        : {})}
      rightSection={
        search && (
          <CloseIcon
            size={18}
            className={clsx(classes.icon, 'close')}
            onClick={handleClose}
          />
        )
      }
    />
  );
};

Search.defaultProps = {
  classNames: '',
  onClose: undefined,
  placeholder: 'common.search',
  Icon: SearchIcon,
};

export default memo(Search);
