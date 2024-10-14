import React, { ReactElement, memo, useCallback } from 'react';

import Loaders from '@/components/Loaders';

interface RenderLoadedProps {
  loaders: boolean[];
  children: ReactElement;
}

const RenderLoaded = ({ loaders, children }: RenderLoadedProps) => {
  const checkLoaders = useCallback(() => {
    for (let i = 0; i < loaders.length; i += 1) {
      if (!loaders[i]) {
        return false;
      }
    }
    return true;
  }, [loaders]);

  return checkLoaders() ? children : <Loaders.Overlay />;
};

export default memo(RenderLoaded);
