import { Flex, Skeleton, Text } from '@mantine/core';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';

import { ImageUploader, InlineEdit, Status } from '@/components';
import { device } from '@/data';

import { placeholders } from '@/common/constants';
import { Device } from '@/common/models';

import useStyles from './useStyles';

const General = () => {
  const { t } = useTranslation();
  const { classes } = useStyles();
  const { updateDevice, changeImage } = device.actions();
  const { device: deviceData, isDeviceLoading } = useRecoilValue(
    device.state.deviceAtom,
  );

  return isDeviceLoading ? (
    <Flex className={classes.generalContainer}>
      <Skeleton height={130} width={130} radius="md" />
      <Flex className={classes.contentContainer}>
        <Flex className={classes.headerContainer} gap={20}>
          <Skeleton height={30} width="20%" radius="xl" />
          <Skeleton height={8} width="20%" radius="xl" />
        </Flex>
        <Skeleton height={10} width="20%" radius="xl" />
        <Skeleton height={10} width="20%" radius="xl" />
      </Flex>
    </Flex>
  ) : (
    <Flex className={classes.generalContainer}>
      <ImageUploader
        radius="sm"
        imageUrl={
          deviceData?.imageUrl ||
          `${placeholders.IMAGE_PLACEHOLDERS_URL}/${placeholders.DEVICE_PLACEHOLDER.DEVICE_A}`
        }
        classNames={{ image: classes.avatar, button: classes.avatarButton }}
        action={(image) => changeImage(image, deviceData?.id ?? 0)}
      />
      <Flex className={classes.contentContainer}>
        <Flex className={classes.headerContainer}>
          <InlineEdit.Input
            value={deviceData?.name ?? ''}
            onSetValue={(value: string) => {
              updateDevice({ ...(deviceData as Device), name: value });
            }}
            classNames={{ text: 'title' }}
          />
          <Flex gap={8} align="center">
            <Text variant="subtitle">
              {t('forms.device.data.label.status')}:
            </Text>
            <Status status={deviceData?.status ?? ''} />
          </Flex>
        </Flex>
        <Flex direction="column" gap={4}>
          <Flex gap={8} align="center">
            <Text>{t('forms.device.data.label.version')}:</Text>
            <Text variant="subtitle">{deviceData?.version.tag}</Text>
          </Flex>
          <Flex gap={8} align="center">
            <Text>{t('forms.device.data.label.serialNumber')}:</Text>
            <Text variant="subtitle">{deviceData?.serialNumber}</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default memo(General);
