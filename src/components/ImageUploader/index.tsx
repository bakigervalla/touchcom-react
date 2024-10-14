import { Avatar, Box, Button, clsx } from '@mantine/core';
import React, { ChangeEvent, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import useStyles from './useStyles';

interface ImageUploaderProps {
  imageUrl: string;
  action: (image: File) => void;
  radius?: 'sm' | 'xl';
  classNames?: { container?: string; image?: string; button?: string };
}
const ImageUploader = ({
  imageUrl,
  action,
  radius,
  classNames,
}: ImageUploaderProps) => {
  const { t } = useTranslation();
  const { classes } = useStyles();

  const triggerUpload = useCallback(() => {
    const input = document.getElementById('fileInput') as HTMLInputElement;
    input.click();
  }, []);

  const handleUpload = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files?.length) {
        return;
      }

      action(e.target.files[0]);
    },
    [action],
  );

  return (
    <Box
      className={clsx(classes.imageUploaderContainer, classNames?.container)}
    >
      <Avatar
        radius={radius}
        className={clsx(classes.profileImage, classNames?.image)}
        src={imageUrl}
      />
      <Button
        variant="transparent"
        className={clsx(classes.uploadButton, classNames?.button)}
        onClick={triggerUpload}
      >
        {t('common.addPhoto')}
      </Button>
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={handleUpload}
        hidden
      />
    </Box>
  );
};

ImageUploader.defaultProps = {
  radius: 'xl',
  classNames: '',
};

export default memo(ImageUploader);
