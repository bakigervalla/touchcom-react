import { TextInput } from '@mantine/core';
import React, { ChangeEvent, memo } from 'react';

import { KeyPair } from '@/common/interfaces';

interface TextProps extends KeyPair<any> {
  value: string;
  name: string;
  disabled?: boolean;
  error?: any;
  inputLabel?: string;
  noHelperSpacing?: boolean;
  placeholder?: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleBlur: React.FocusEventHandler<HTMLInputElement> | undefined;
}

const Text = ({
  value,
  name,
  disabled,
  error,
  inputLabel,
  noHelperSpacing,
  placeholder,
  handleChange,
  handleBlur,
  ...rest
}: TextProps) => (
  <TextInput
    label={inputLabel}
    name={name}
    value={value}
    autoComplete="off"
    onChange={handleChange}
    onBlur={handleBlur}
    placeholder={placeholder}
    error={(error as string) || (noHelperSpacing ? null : ' ')}
    disabled={disabled}
    {...rest}
  />
);

Text.defaultProps = {
  disabled: false,
  error: undefined,
  inputLabel: undefined,
  noHelperSpacing: true,
  placeholder: '',
};

export default memo(Text);
