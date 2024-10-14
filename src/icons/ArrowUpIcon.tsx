import { rem } from '@mantine/core';
import React, { memo } from 'react';

import { IconProps } from '@/common/interfaces';

const ArrowUpIcon = ({ size, style, ...others }: IconProps) => (
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
    <g id="Arrow">
      <g id="vuesax/linear/arrow-up">
        <g id="arrow-up">
          <path
            id="Vector"
            d="M9.03484 4.785L5.99984 1.75L2.96484 4.785"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </g>
  </svg>
);

ArrowUpIcon.defaultProps = {
  size: 24,
};

export default memo(ArrowUpIcon);
