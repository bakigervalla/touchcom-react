import { rem } from '@mantine/core';
import React, { memo } from 'react';

import { IconProps } from '@/common/interfaces';

const AttachmentIcon = ({ size, style, ...others }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.5"
    viewBox="0 0 18 18"
    style={{ width: rem(size), height: rem(size), ...style }}
    {...others}
  >
    <path
      d="M9.24726 9.11244L7.39477 10.9649C6.36727 11.9924 6.36727 13.6499 7.39477 14.6774C8.42226 15.7049 10.0798 15.7049 11.1073 14.6774L14.0248 11.7599C16.0723 9.71244 16.0723 6.38244 14.0248 4.33494C11.9773 2.28744 8.64727 2.28744 6.59977 4.33494L3.41977 7.51494C1.66477 9.26994 1.66477 12.1199 3.41977 13.8824"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

AttachmentIcon.defaultProps = {
  size: 24,
};

export default memo(AttachmentIcon);
