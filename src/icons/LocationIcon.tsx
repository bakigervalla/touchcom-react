import { rem } from '@mantine/core';
import React, { memo } from 'react';

import { IconProps } from '@/common/interfaces';

const LocationIcon = ({ size, style, ...others }: IconProps) => (
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
    <path d="M13.3877 5.78125C12.7314 2.89375 10.2127 1.59375 8.00018 1.59375C8.00018 1.59375 8.00018 1.59375 7.99393 1.59375C5.78768 1.59375 3.26268 2.8875 2.60643 5.775C1.87518 9 3.85018 11.7312 5.63768 13.45C6.30018 14.0875 7.15018 14.4062 8.00018 14.4062C8.85018 14.4062 9.70018 14.0875 10.3564 13.45C12.1439 11.7312 14.1189 9.00625 13.3877 5.78125Z" />
    <path
      d="M8 8.9126C9.08731 8.9126 9.96875 8.03116 9.96875 6.94385C9.96875 5.85654 9.08731 4.9751 8 4.9751C6.91269 4.9751 6.03125 5.85654 6.03125 6.94385C6.03125 8.03116 6.91269 8.9126 8 8.9126Z"
      fill="white"
    />
  </svg>
);

LocationIcon.defaultProps = {
  size: 24,
};

export default memo(LocationIcon);
