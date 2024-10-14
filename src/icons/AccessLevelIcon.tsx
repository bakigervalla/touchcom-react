import { rem } from '@mantine/core';
import React, { memo } from 'react';

import { IconProps } from '@/common/interfaces';

const AccessLevelIcon = ({ size, style, ...others }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.5"
    viewBox="0 0 20 20"
    style={{ width: rem(size), height: rem(size), ...style }}
    {...others}
  >
    <path
      d="M1.6665 7.49984V5.4165C1.6665 3.3415 3.3415 1.6665 5.4165 1.6665H7.49984"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.5 1.6665H14.5833C16.6583 1.6665 18.3333 3.3415 18.3333 5.4165V7.49984"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.3335 13.3335V14.5835C18.3335 16.6585 16.6585 18.3335 14.5835 18.3335H13.3335"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.49984 18.3333H5.4165C3.3415 18.3333 1.6665 16.6583 1.6665 14.5833V12.5"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.75016 5.8335V7.50016C8.75016 8.3335 8.3335 8.75016 7.50016 8.75016H5.8335C5.00016 8.75016 4.5835 8.3335 4.5835 7.50016V5.8335C4.5835 5.00016 5.00016 4.5835 5.8335 4.5835H7.50016C8.3335 4.5835 8.75016 5.00016 8.75016 5.8335Z"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.4167 5.8335V7.50016C15.4167 8.3335 15 8.75016 14.1667 8.75016H12.5C11.6667 8.75016 11.25 8.3335 11.25 7.50016V5.8335C11.25 5.00016 11.6667 4.5835 12.5 4.5835H14.1667C15 4.5835 15.4167 5.00016 15.4167 5.8335Z"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.75016 12.5V14.1667C8.75016 15 8.3335 15.4167 7.50016 15.4167H5.8335C5.00016 15.4167 4.5835 15 4.5835 14.1667V12.5C4.5835 11.6667 5.00016 11.25 5.8335 11.25H7.50016C8.3335 11.25 8.75016 11.6667 8.75016 12.5Z"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.4167 12.5V14.1667C15.4167 15 15 15.4167 14.1667 15.4167H12.5C11.6667 15.4167 11.25 15 11.25 14.1667V12.5C11.25 11.6667 11.6667 11.25 12.5 11.25H14.1667C15 11.25 15.4167 11.6667 15.4167 12.5Z"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

AccessLevelIcon.defaultProps = {
  size: 24,
};

export default memo(AccessLevelIcon);
