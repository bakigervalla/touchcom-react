import { rem } from '@mantine/core';
import React, { memo } from 'react';

import { IconProps } from '@/common/interfaces';

const CalendarDateIcon = ({ size, style, ...others }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.5"
    viewBox="0 0 20 20"
    style={{ width: rem(size), height: rem(size), ...style }}
    {...others}
  >
    <path
      d="M6.66699 1.6665V4.1665"
      strokeWidth="1.2"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke="#0A0A0A"
    />
    <path
      d="M13.333 1.6665V4.1665"
      strokeWidth="1.2"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke="#0A0A0A"
    />
    <path
      d="M13.3333 2.9165C16.1083 3.0665 17.5 4.12484 17.5 8.0415V13.1915C17.5 16.6248 16.6667 18.3415 12.5 18.3415H7.5C3.33333 18.3415 2.5 16.6248 2.5 13.1915V8.0415C2.5 4.12484 3.89167 3.07484 6.66667 2.9165H13.3333Z"
      strokeWidth="1.2"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke="#0A0A0A"
    />
    <path
      d="M17.2913 14.6665H2.70801"
      strokeWidth="1.2"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke="#0A0A0A"
    />
    <path
      d="M10.0003 6.875C8.97533 6.875 8.10866 7.43333 8.10866 8.51667C8.10866 9.03333 8.35033 9.425 8.71699 9.675C8.20866 9.975 7.91699 10.4583 7.91699 11.025C7.91699 12.0583 8.70866 12.7 10.0003 12.7C11.2837 12.7 12.0837 12.0583 12.0837 11.025C12.0837 10.4583 11.792 9.96667 11.2753 9.675C11.6503 9.41667 11.8837 9.03333 11.8837 8.51667C11.8837 7.43333 11.0253 6.875 10.0003 6.875ZM10.0003 9.24167C9.56699 9.24167 9.25033 8.98333 9.25033 8.575C9.25033 8.15833 9.56699 7.91667 10.0003 7.91667C10.4337 7.91667 10.7503 8.15833 10.7503 8.575C10.7503 8.98333 10.4337 9.24167 10.0003 9.24167ZM10.0003 11.6667C9.45033 11.6667 9.05033 11.3917 9.05033 10.8917C9.05033 10.3917 9.45033 10.125 10.0003 10.125C10.5503 10.125 10.9503 10.4 10.9503 10.8917C10.9503 11.3917 10.5503 11.6667 10.0003 11.6667Z"
      fill="#0A0A0A"
    />
  </svg>
);

CalendarDateIcon.defaultProps = {
  size: 24,
};

export default memo(CalendarDateIcon);
