import { Box } from '@mantine/core';
import React, { memo, useCallback, useRef, useState } from 'react';

import { AttachEntitySearch, EntityInfo } from '@/components';
import { useOnClickOutside } from '@/hooks';

import { EntityInfoData, HistoryItem, NotFoundData } from '@/common/interfaces';

interface AttachEntityProps {
  search: { notFound: NotFoundData; data: HistoryItem[]; placeholder: string };
  infoData: EntityInfoData | null;
  handleSearch: (search: string) => void;
  attachKeyAction: (item: HistoryItem) => void;
  infoImageRadius?: 'sm' | 'xl';
  infoImageSize?: 'sm' | 'md' | 'lg' | 'xl';
}

const AttachEntity = ({
  search,
  infoData,
  infoImageSize,
  infoImageRadius,
  handleSearch,
  attachKeyAction,
}: AttachEntityProps) => {
  const [showInput, setShowInput] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(
    wrapperRef,
    useCallback(() => setShowInput(false), []),
  );

  return (
    <Box ref={wrapperRef}>
      {showInput ? (
        <AttachEntitySearch
          notFound={search.notFound}
          action={handleSearch}
          onItemSelect={(item) => {
            attachKeyAction(item);
            setShowInput(false);
          }}
          data={search.data}
          placeholder={search.placeholder}
        />
      ) : (
        <EntityInfo
          imageSize={infoImageSize}
          imageRadius={infoImageRadius}
          onClick={() => setShowInput(true)}
          data={infoData}
        />
      )}
    </Box>
  );
};

AttachEntity.defaultProps = {
  infoImageSize: 'sm',
  infoImageRadius: 'xl',
};

export default memo(AttachEntity);
