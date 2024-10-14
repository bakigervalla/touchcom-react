import { clsx } from '@mantine/core';
import Lottie from 'lottie-react';
import React, { memo } from 'react';

import lottieLoader from '../lottieLoader.json';

import useStyles from './useStyles';

type OverlayProps = React.HTMLAttributes<HTMLElement>;

const Overlay = ({ ...props }: OverlayProps) => {
  const { classes } = useStyles();

  return (
    <Lottie
      className={clsx(classes.spinner, props.className)}
      animationData={lottieLoader}
      loop
    />
  );
};

export default memo(Overlay);
