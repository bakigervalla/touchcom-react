import { rem } from '@mantine/core';
import React, { memo } from 'react';

import { IconProps } from '@/common/interfaces';

const WarningIcon = ({ size, style, ...others }: IconProps) => (
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
        d="M52 24.4761V39.5239C52 41.9879 50.6791 44.276 48.5437 45.53L35.4673 53.076C33.3319 54.308 30.6901 54.308 28.5327 53.076L15.4563 45.53C13.3209 44.298 12 42.0099 12 39.5239V24.4761C12 22.0121 13.3209 19.724 15.4563 18.47L28.5327 10.924C30.6681 9.692 33.3099 9.692 35.4673 10.924L48.5437 18.47C50.6791 19.724 52 21.9901 52 24.4761Z"
        fill="#FFE6DB"
      />
      <path
        d="M32 20.6665V34.6665"
        stroke="#DB4915"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M56.2152 22.8803V41.1202C56.2152 44.1068 54.6151 46.8803 52.0285 48.4003L36.1885 57.5469C33.6018 59.0403 30.4017 59.0403 27.7884 57.5469L11.9484 48.4003C9.36174 46.9069 7.76172 44.1335 7.76172 41.1202V22.8803C7.76172 19.8936 9.36174 17.1201 11.9484 15.6001L27.7884 6.4535C30.3751 4.96016 33.5751 4.96016 36.1885 6.4535L52.0285 15.6001C54.6151 17.1201 56.2152 19.8669 56.2152 22.8803Z"
        stroke="#DB4915"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M32 43.2002V43.4669"
        stroke="#DB4915"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

WarningIcon.defaultProps = {
  size: 24,
};

export default memo(WarningIcon);
