import { rem } from '@mantine/core';
import React, { memo } from 'react';

import { IconProps } from '@/common/interfaces';

const NotFoundAccessLevelIcon = ({ size, style, ...others }: IconProps) => (
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
        d="M20.332 28.5002V25.5835C20.332 22.6785 22.677 20.3335 25.582 20.3335H28.4987"
        stroke="#757575"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M35.5 20.3335H38.4167C41.3217 20.3335 43.6667 22.6785 43.6667 25.5835V28.5002"
        stroke="#757575"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M43.668 36.6665V38.4165C43.668 41.3215 41.323 43.6665 38.418 43.6665H36.668"
        stroke="#757575"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28.4987 43.6667H25.582C22.677 43.6667 20.332 41.3217 20.332 38.4167V35.5"
        stroke="#757575"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30.2513 26.1665V28.4998C30.2513 29.6665 29.668 30.2498 28.5013 30.2498H26.168C25.0013 30.2498 24.418 29.6665 24.418 28.4998V26.1665C24.418 24.9998 25.0013 24.4165 26.168 24.4165H28.5013C29.668 24.4165 30.2513 24.9998 30.2513 26.1665Z"
        stroke="#757575"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M39.5833 26.1665V28.4998C39.5833 29.6665 39 30.2498 37.8333 30.2498H35.5C34.3333 30.2498 33.75 29.6665 33.75 28.4998V26.1665C33.75 24.9998 34.3333 24.4165 35.5 24.4165H37.8333C39 24.4165 39.5833 24.9998 39.5833 26.1665Z"
        stroke="#757575"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30.2513 35.5V37.8333C30.2513 39 29.668 39.5833 28.5013 39.5833H26.168C25.0013 39.5833 24.418 39 24.418 37.8333V35.5C24.418 34.3333 25.0013 33.75 26.168 33.75H28.5013C29.668 33.75 30.2513 34.3333 30.2513 35.5Z"
        stroke="#757575"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M39.5833 35.5V37.8333C39.5833 39 39 39.5833 37.8333 39.5833H35.5C34.3333 39.5833 33.75 39 33.75 37.8333V35.5C33.75 34.3333 34.3333 33.75 35.5 33.75H37.8333C39 33.75 39.5833 34.3333 39.5833 35.5Z"
        stroke="#757575"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

NotFoundAccessLevelIcon.defaultProps = {
  size: 24,
};

export default memo(NotFoundAccessLevelIcon);
