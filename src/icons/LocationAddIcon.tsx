import { rem } from '@mantine/core';
import React, { memo } from 'react';

import { IconProps } from '@/common/interfaces';

const LocationAddIcon = ({ size, style, ...others }: IconProps) => (
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
      d="M7.70898 9.16663H12.2923"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path d="M10 11.4583V6.875" strokeWidth="1.5" strokeLinecap="round" />
    <path
      d="M3.01675 7.07496C4.65842 -0.141705 15.3501 -0.133372 16.9834 7.08329C17.9417 11.3166 15.3084 14.9 13.0001 17.1166C11.3251 18.7333 8.67508 18.7333 6.99175 17.1166C4.69175 14.9 2.05842 11.3083 3.01675 7.07496Z"
      strokeWidth="1.5"
    />
  </svg>
);

LocationAddIcon.defaultProps = {
  size: 24,
};

export default memo(LocationAddIcon);
