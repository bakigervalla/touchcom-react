import { rem } from '@mantine/core';
import React, { memo } from 'react';

import { IconProps } from '@/common/interfaces';

const ConfigurationIcon = ({ size, style, ...others }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    style={{ width: rem(size), height: rem(size), ...style }}
    {...others}
  >
    <path
      d="M18.3333 14.5833H12.5"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.16602 14.5833H1.66602"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.334 5.41675H15.834"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.49935 5.41675H1.66602"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.83268 12.0833H10.8327C11.7493 12.0833 12.4993 12.4999 12.4993 13.7499V15.4166C12.4993 16.6666 11.7493 17.0833 10.8327 17.0833H5.83268C4.91602 17.0833 4.16602 16.6666 4.16602 15.4166V13.7499C4.16602 12.4999 4.91602 12.0833 5.83268 12.0833Z"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.16667 2.91675H14.1667C15.0833 2.91675 15.8333 3.33341 15.8333 4.58341V6.25008C15.8333 7.50008 15.0833 7.91675 14.1667 7.91675H9.16667C8.25 7.91675 7.5 7.50008 7.5 6.25008V4.58341C7.5 3.33341 8.25 2.91675 9.16667 2.91675Z"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

ConfigurationIcon.defaultProps = {
  size: 24,
};

export default memo(ConfigurationIcon);
