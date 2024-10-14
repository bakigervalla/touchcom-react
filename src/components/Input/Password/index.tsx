import { PasswordInput } from '@mantine/core';
import React, { ChangeEvent, memo } from 'react';

import { EyeIcon, EyeOffIcon } from '@/icons';

import { KeyPair } from '@/common/interfaces';

interface PasswordProps extends KeyPair<any> {
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

const Password = ({
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
}: PasswordProps) => (
  <PasswordInput
    label={inputLabel}
    name={name}
    value={value}
    autoComplete="off"
    onChange={handleChange}
    onBlur={handleBlur}
    placeholder={placeholder}
    error={(error as string) || (noHelperSpacing ? null : ' ')}
    disabled={disabled}
    visibilityToggleIcon={({ reveal, size }) =>
      reveal ? <EyeOffIcon size={size} /> : <EyeIcon size={size} />
    }
    {...rest}
  />
);

Password.defaultProps = {
  disabled: false,
  error: undefined,
  inputLabel: undefined,
  noHelperSpacing: true,
  placeholder: '',
};

export default memo(Password);
