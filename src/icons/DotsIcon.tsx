import { rem } from '@mantine/core';
import React, { memo } from 'react';

import { IconProps } from '@/common/interfaces';

const DotsIcon = ({ size, style, ...others }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.5"
    viewBox="0 0 18 18"
    style={{ width: rem(size), height: rem(size), ...style }}
    {...others}
  >
    <path
      fill="#757575"
      d="M3.75 7.5C2.925 7.5 2.25 8.175 2.25 9C2.25 9.825 2.925 10.5 3.75 10.5C4.575 10.5 5.25 9.825 5.25 9C5.25 8.175 4.575 7.5 3.75 7.5Z"
    />
    <path
      fill="#757575"
      d="M14.25 7.5C13.425 7.5 12.75 8.175 12.75 9C12.75 9.825 13.425 10.5 14.25 10.5C15.075 10.5 15.75 9.825 15.75 9C15.75 8.175 15.075 7.5 14.25 7.5Z"
    />
    <path
      fill="#757575"
      d="M9 7.5C8.175 7.5 7.5 8.175 7.5 9C7.5 9.825 8.175 10.5 9 10.5C9.825 10.5 10.5 9.825 10.5 9C10.5 8.175 9.825 7.5 9 7.5Z"
    />
  </svg>
);

DotsIcon.defaultProps = {
  size: 24,
};

export default memo(DotsIcon);
