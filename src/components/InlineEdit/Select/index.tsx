import {
  Box,
  Select as MantineSelect,
  Text,
  Tooltip,
  clsx,
} from '@mantine/core';
import { IconAlertTriangleFilled } from '@tabler/icons-react';
import { t } from 'i18next';
import React, {
  KeyboardEvent,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { useOnClickOutside } from '@/hooks';
import { ArrowDownIcon } from '@/icons';

import { ContentBox } from '@/styles/boxes';

import useStyles from './useStyles';

interface SelectProps {
  data: { label: string; value: string }[];
  selected: { label: string; value: string } | undefined;
  onSetValue: (value: string) => void;
  isEditingOn?: boolean;
  placeholder?: string;
  classNames?: { text?: string; input?: string; buttons?: string };
}

const Select = ({
  data,
  selected,
  onSetValue,
  isEditingOn,
  placeholder,
  classNames,
}: SelectProps) => {
  const { classes } = useStyles();
  const [selectedOption, setSelectedOption] = useState(selected);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isEditing, setIsEditing] = useState(isEditingOn);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const resetError = useCallback(() => {
    setHasError(false);
    setErrorMessage('');
  }, []);

  const handleSave = useCallback(() => {
    if (!selectedOption) {
      setHasError(true);
      setErrorMessage('Input cannot be empty');
      return;
    }

    if (selectedOption.value !== selected?.value) {
      onSetValue(selectedOption.value);
      resetError();
    }

    setIsEditing(false);
  }, [selectedOption, selected, onSetValue, resetError]);

  const handleCancel = useCallback(() => {
    setSelectedOption(selectedOption);
    setIsEditing(false);
    resetError();
  }, [selectedOption, resetError]);

  useOnClickOutside(wrapperRef, useCallback(handleSave, [handleSave]));

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        handleSave();
      } else if (event.key === 'Escape') {
        handleCancel();
      }
    },
    [handleSave, handleCancel],
  );

  const handleInputChange = useCallback(
    (e: string) => {
      resetError();
      const option = data.find((el) => el.value === e);
      if (option) setSelectedOption(option);
    },
    [resetError, data],
  );

  useEffect(() => {
    setSelectedOption(selected);
  }, [selected]);

  return !isEditing ? (
    <Text
      className={clsx(classes.text, classNames?.text)}
      onClick={() => setIsEditing(true)}
      truncate
    >
      {selectedOption?.label || placeholder}
    </Text>
  ) : (
    <Tooltip label={errorMessage} position="top" opened={hasError} withArrow>
      <Box ref={isEditingOn ? null : wrapperRef}>
        <MantineSelect
          className={classNames?.input}
          variant="outlined"
          searchable
          clearable
          data={data}
          value={selectedOption?.value}
          onKeyDown={onKeyDown}
          onChange={handleInputChange}
          nothingFound={t('forms.validation.noOptions')}
          placeholder={placeholder}
          rightSection={
            <Box className={classes.buttonContainer}>
              <ArrowDownIcon size={18} />
              {hasError && (
                <ContentBox onClick={handleSave} className={classes.contentBox}>
                  <IconAlertTriangleFilled
                    size={12}
                    className={clsx('icon', 'warning')}
                  />
                </ContentBox>
              )}
            </Box>
          }
        />
      </Box>
    </Tooltip>
  );
};

Select.defaultProps = {
  isEditingOn: false,
  placeholder: t('forms.placeholders.promptSelectValue'),
  classNames: { text: '', input: '', buttons: '' },
};

export default memo(Select);
