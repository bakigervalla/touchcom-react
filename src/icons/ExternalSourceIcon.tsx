import { rem } from '@mantine/core';
import React, { memo } from 'react';

import { IconProps } from '@/common/interfaces';

const ApartmentIcon = ({ size, style, ...others }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.5"
    viewBox="0 0 14 15"
    style={{ width: rem(size), height: rem(size), ...style }}
    {...others}
  >
    <path
      d="M7.5835 6.91615L12.3668 2.13281"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.8332 4.46602V1.66602H10.0332"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.4165 1.66602H5.24984C2.33317 1.66602 1.1665 2.83268 1.1665 5.74935V9.24935C1.1665 12.166 2.33317 13.3327 5.24984 13.3327H8.74984C11.6665 13.3327 12.8332 12.166 12.8332 9.24935V8.08268"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

ApartmentIcon.defaultProps = {
  size: 24,
};

export default memo(ApartmentIcon);
