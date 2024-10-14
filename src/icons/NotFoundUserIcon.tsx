import { rem } from '@mantine/core';
import React, { memo } from 'react';

import { IconProps } from '@/common/interfaces';

const NotFoundUserIcon = ({ size, style, ...others }: IconProps) => (
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
        d="M28.8727 30.6794C28.7669 30.6688 28.6399 30.6688 28.5236 30.6794C26.0058 30.5948 24.0063 28.5319 24.0063 25.993C24.0063 23.4011 26.101 21.2959 28.7034 21.2959C31.2952 21.2959 33.4005 23.4011 33.4005 25.993C33.3899 28.5319 31.3905 30.5948 28.8727 30.6794Z"
        stroke="#757575"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M36.5408 23.4119C38.5932 23.4119 40.2435 25.0728 40.2435 27.1145C40.2435 29.1139 38.6566 30.7431 36.6784 30.8171C36.5937 30.8066 36.4985 30.8066 36.4033 30.8171"
        stroke="#757575"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23.5832 34.5831C21.0231 36.2969 21.0231 39.0897 23.5832 40.7929C26.4924 42.7394 31.2635 42.7394 34.1727 40.7929C36.7328 39.0791 36.7328 36.2863 34.1727 34.5831C31.2741 32.6471 26.503 32.6471 23.5832 34.5831Z"
        stroke="#757575"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M38.5835 40.3381C39.3452 40.1794 40.0645 39.8726 40.657 39.4177C42.3073 38.18 42.3073 36.1382 40.657 34.9005C40.0751 34.4562 39.3663 34.16 38.6152 33.9907"
        stroke="#757575"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

NotFoundUserIcon.defaultProps = {
  size: 24,
};

export default memo(NotFoundUserIcon);
