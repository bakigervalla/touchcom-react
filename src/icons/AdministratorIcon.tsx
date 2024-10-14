import { rem } from '@mantine/core';
import React, { memo } from 'react';

import { IconProps } from '@/common/interfaces';

const AdministratorIcon = ({ size, style, ...others }: IconProps) => (
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
      d="M15 15.7174H14.3667C13.7 15.7174 13.0667 15.9758 12.6 16.4424L11.175 17.8508C10.525 18.4924 9.46668 18.4924 8.81668 17.8508L7.39166 16.4424C6.925 15.9758 6.28333 15.7174 5.625 15.7174H5C3.61667 15.7174 2.5 14.6091 2.5 13.2425V4.15076C2.5 2.78409 3.61667 1.67578 5 1.67578H15C16.3833 1.67578 17.5 2.78409 17.5 4.15076V13.2425C17.5 14.6008 16.3833 15.7174 15 15.7174Z"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.99979 8.33253C11.0721 8.33253 11.9415 7.4632 11.9415 6.39085C11.9415 5.3185 11.0721 4.44922 9.99979 4.44922C8.92743 4.44922 8.05811 5.3185 8.05811 6.39085C8.05811 7.4632 8.92743 8.33253 9.99979 8.33253Z"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.3332 13.0487C13.3332 11.5487 11.8415 10.332 9.99984 10.332C8.15817 10.332 6.6665 11.5487 6.6665 13.0487"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

AdministratorIcon.defaultProps = {
  size: 24,
};

export default memo(AdministratorIcon);
