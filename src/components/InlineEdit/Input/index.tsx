import { Flex, Text, TextInput, Tooltip, clsx } from '@mantine/core';
import { IconAlertTriangleFilled, IconCheck, IconX } from '@tabler/icons-react';
import React, {
  ChangeEvent,
  KeyboardEvent,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

import { useOnClickOutside } from '@/hooks';

import { ContentBox } from '@/styles/boxes';

import useStyles from './useStyles';

interface InputProps {
  value: string;
  type?: 'text' | 'number' | 'password';
  isEditingOn?: boolean;
  onSetValue: (value: string) => void;
  classNames?: { text?: string; input?: string; buttons?: string };
  placeholder?: string;
}

const Input = ({
  value,
  type,
  isEditingOn,
  onSetValue,
  classNames,
  placeholder,
}: InputProps) => {
  const { t } = useTranslation();
  const { classes } = useStyles();
  const [inputValue, setInputValue] = useState(value);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isEditing, setIsEditing] = useState(isEditingOn);
  const wrapperRef = useRef(null);

  const resetError = useCallback(() => {
    setHasError(false);
    setErrorMessage('');
  }, []);

  const handleSave = useCallback(() => {
    if (inputValue.trim().length === 0) {
      setHasError(true);
      setErrorMessage('Input cannot be empty');
      return;
    }
    if (inputValue.trim() !== value) {
      onSetValue(inputValue);
      resetError();
    }
    setIsEditing(false);
  }, [inputValue, onSetValue, resetError, value]);

  const handleCancel = useCallback(() => {
    setInputValue(value);
    setIsEditing(false);
    resetError();
  }, [resetError, value]);

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
    (event: ChangeEvent<HTMLInputElement>) => {
      resetError();
      setInputValue(event.target.value);
    },
    [resetError],
  );

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return !isEditing ? (
    <Text
      className={clsx(classes.text, classNames?.text)}
      onClick={() => setIsEditing(true)}
      truncate
    >
      {inputValue || t(placeholder || '')}
    </Text>
  ) : (
    <Tooltip label={errorMessage} position="top" opened={hasError} withArrow>
      <Flex ref={isEditingOn ? null : wrapperRef}>
        <TextInput
          className={clsx(classes.root, classNames?.input)}
          variant="unstyled"
          onKeyDown={onKeyDown}
          value={inputValue}
          type={type}
          onChange={handleInputChange}
          placeholder={t(placeholder || '')}
          rightSection={
            <Flex className={classes.buttonContainer}>
              {hasError && (
                <ContentBox onClick={handleSave} className={classes.contentBox}>
                  <IconAlertTriangleFilled
                    size={12}
                    className={clsx('icon', 'warning')}
                  />
                </ContentBox>
              )}
              <ContentBox
                onClick={handleSave}
                className={clsx(
                  classes.contentBox,
                  'confirm',
                  classNames?.buttons,
                )}
              >
                <IconCheck size={12} className="icon" />
              </ContentBox>
              <ContentBox
                className={clsx(
                  classes.contentBox,
                  'cancel',
                  classNames?.buttons,
                )}
                onClick={handleCancel}
              >
                <IconX size={12} className="icon" />
              </ContentBox>
            </Flex>
          }
        />
      </Flex>
    </Tooltip>
  );
};

Input.defaultProps = {
  type: 'text',
  isEditingOn: false,
  classNames: { text: '', input: '', buttons: '' },
  placeholder: 'common.enterValue',
};

export default memo(Input);
