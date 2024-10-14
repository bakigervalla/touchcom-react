import { rem } from '@mantine/core';
import React, { memo } from 'react';

import { IconProps } from '@/common/interfaces';

const NotFoundDeviceIcon = ({ size, style, ...others }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="transparent"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.5"
    viewBox="0 0 64 64"
    style={{ width: rem(size), height: rem(size), ...style }}
    {...others}
  >
    <g opacity="0.8">
      <path
        d="M24.5 57H39.5C52 57 57 52 57 39.5V24.5C57 12 52 7 39.5 7H24.5C12 7 7 12 7 24.5V39.5C7 52 12 57 24.5 57Z"
        stroke="#757575"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25.7 53H38.3C48.8 53 53 48.8 53 38.3V25.7C53 15.2 48.8 11 38.3 11H25.7C15.2 11 11 15.2 11 25.7V38.3C11 48.8 15.2 53 25.7 53Z"
        fill="#F5F5F5"
      />
      <path
        d="M19.1797 27.5266C26.7476 21.6682 36.6297 21.6682 44.1976 27.5266"
        stroke="#757575"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.5166 33.9686C28.0831 29.6739 35.3175 29.6739 40.884 33.9686"
        stroke="#757575"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M27.1035 40.4108C29.8763 38.2634 33.5039 38.2634 36.2768 40.4108"
        stroke="#757575"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

NotFoundDeviceIcon.defaultProps = {
  size: 24,
};

export default memo(NotFoundDeviceIcon);
