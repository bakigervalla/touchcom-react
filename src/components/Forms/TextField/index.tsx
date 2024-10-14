import { FastField, FastFieldProps } from 'formik';
import React, { ChangeEvent, memo, useCallback } from 'react';

import Input from '@/components/Input';

import { KeyPair } from '@/common/interfaces';

interface FormikTextFieldProps extends KeyPair<any> {
  disabled?: boolean;
  error?: any;
  inputLabel?: string;
  maxLength?: number;
  noHelperSpacing?: boolean;
  placeholder?: string;
  type?: 'text' | 'number' | 'date' | 'password';
  trim?: boolean;
}

const FormikTextField = ({
  form: { setFieldValue },
  field: { value, name },
  disabled,
  error,
  inputLabel,
  maxLength,
  noHelperSpacing,
  type,
  placeholder,
  trim,
  ...rest
}: FormikTextFieldProps & FastFieldProps) => {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target) {
        return;
      }

      const value =
        type === 'number' ? parseInt(e.target.value, 10) : e.target.value;
      const shouldTrim = type !== 'number' && trim;
      if (maxLength && type !== 'number') {
        if ((value as string).length <= maxLength) {
          void setFieldValue(
            name,
            shouldTrim ? (value as string).trim().replace(/\s/g, '') : value,
          );
        } else {
          const slicedValue = (value as string).slice(0, maxLength);
          void setFieldValue(
            name,
            shouldTrim ? slicedValue.trim().replace(/\s/g, '') : slicedValue,
          );
        }
      } else {
        void setFieldValue(
          name,
          shouldTrim ? (value as string).trim().replace(/\s/g, '') : value,
        );
      }
    },
    [maxLength, name, setFieldValue, trim, type],
  );

  return type === 'password' ? (
    <Input.Password
      label={inputLabel}
      name={name}
      value={value as string}
      autoComplete="off"
      handleChange={(e) => handleChange(e)}
      handleBlur={() => {
        void setFieldValue(name, trim ? (value as string).trim() : value);
      }}
      placeholder={placeholder}
      error={(error as string) || (noHelperSpacing ? null : ' ')}
      disabled={disabled}
      {...rest}
    />
  ) : (
    <Input.Root
      label={inputLabel}
      name={name}
      value={value as string}
      autoComplete="off"
      type={type}
      handleChange={(e) => handleChange(e)}
      handleBlur={() => {
        void setFieldValue(name, trim ? (value as string).trim() : value);
      }}
      placeholder={placeholder}
      error={(error as string) || (noHelperSpacing ? null : ' ')}
      disabled={disabled}
      {...rest}
    />
  );
};

const TextField = (props: FormikTextFieldProps) => (
  <FastField component={FormikTextField} {...props} />
);

FormikTextField.defaultProps = {
  disabled: false,
  error: undefined,
  inputLabel: undefined,
  maxLength: 100,
  noHelperSpacing: true,
  placeholder: '',
  trim: false,
  type: 'text',
};

TextField.defaultProps = {
  disabled: false,
  error: undefined,
  inputLabel: undefined,
  maxLength: 100,
  noHelperSpacing: true,
  placeholder: '',
  trim: false,
  type: 'text',
};

export default memo(TextField);
