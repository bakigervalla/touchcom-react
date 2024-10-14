import { rem } from '@mantine/core';
import React, { memo } from 'react';

import { IconProps } from '@/common/interfaces';

const NotFoundExceptionIcon = ({ size, style, ...others }: IconProps) => (
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
        d="M43.666 25.0002V27.8235C43.666 29.6668 42.4993 30.8335 40.656 30.8335H36.666V22.6785C36.666 21.3835 37.7277 20.3335 39.0227 20.3335C40.2944 20.3452 41.461 20.8585 42.301 21.6985C43.141 22.5502 43.666 23.7168 43.666 25.0002Z"
        stroke="#757575"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.334 26.1668V42.5002C20.334 43.4685 21.4306 44.0168 22.2006 43.4335L24.1956 41.9402C24.6623 41.5902 25.3157 41.6368 25.7357 42.0568L27.6723 44.0052C28.1273 44.4602 28.874 44.4602 29.329 44.0052L31.289 42.0452C31.6973 41.6368 32.3507 41.5902 32.8057 41.9402L34.8007 43.4335C35.5707 44.0052 36.6673 43.4568 36.6673 42.5002V22.6668C36.6673 21.3835 37.7173 20.3335 39.0007 20.3335H26.1673H25.0007C21.5007 20.3335 20.334 22.4218 20.334 25.0002V26.1668Z"
        stroke="#757575"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

NotFoundExceptionIcon.defaultProps = {
  size: 24,
};

export default memo(NotFoundExceptionIcon);
