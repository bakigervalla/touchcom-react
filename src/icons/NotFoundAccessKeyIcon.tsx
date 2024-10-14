import { rem } from '@mantine/core';
import React, { memo } from 'react';

import { IconProps } from '@/common/interfaces';

const NotFoundAccessKeyIcon = ({ size, style, ...others }: IconProps) => (
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
        d="M30.94 40.125H27.1266C26.455 40.125 25.8591 40.1033 25.3283 40.0275C22.4791 39.7133 21.71 38.37 21.71 34.7083V29.2917C21.71 25.63 22.4791 24.2867 25.3283 23.9725C25.8591 23.8967 26.455 23.875 27.1266 23.875H30.875"
        stroke="#757575"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M35.2734 23.875H36.8768C37.5484 23.875 38.1443 23.8967 38.6751 23.9725C41.5243 24.2867 42.2934 25.63 42.2934 29.2917V34.7083C42.2934 38.37 41.5243 39.7133 38.6751 40.0275C38.1443 40.1033 37.5484 40.125 36.8768 40.125H35.2734"
        stroke="#757575"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M35.25 21.167V42.8337"
        stroke="#757575"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M27.665 28.208V35.7913"
        stroke="#757575"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

NotFoundAccessKeyIcon.defaultProps = {
  size: 24,
};

export default memo(NotFoundAccessKeyIcon);
