import { Badge, Flex, Skeleton, Text, Title } from '@mantine/core';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';

import { ImageUploader, InlineEdit } from '@/components';
import { user } from '@/data';

import { placeholders } from '@/common/constants';
import { Address, Site, User } from '@/common/models';
import { common, type } from '@/common/utils';

import useStyles from './useStyles';

const General = () => {
  const { t } = useTranslation();
  const { classes } = useStyles();
  const { updateUser, changeImage } = user.actions();
  const { resident, isResidentLoading } = useRecoilValue(
    user.state.residentAtom,
  );

  return isResidentLoading ? (
    <Flex className={classes.generalContainer}>
      <Skeleton height={160} width={160} circle />
      <Flex className={classes.contentContainer}>
        <Skeleton height={30} width="20%" radius="xl" />
        <Flex className={classes.infoContainer} gap={20}>
          <Skeleton height={10} width="20%" radius="xl" />
          <Skeleton height={10} width="20%" radius="xl" />
          <Skeleton height={10} width="20%" radius="xl" />
        </Flex>
      </Flex>
    </Flex>
  ) : (
    <Flex className={classes.generalContainer}>
      <ImageUploader
        imageUrl={
          resident?.imageUrl ||
          `${placeholders.IMAGE_PLACEHOLDERS_URL}/${placeholders.USER_PLACEHOLDER.USER_A}`
        }
        classNames={{ image: classes.avatar }}
        action={(image) => changeImage(image, resident?.id ?? 0)}
      />
      <Flex className={classes.contentContainer}>
        <Flex direction="column" gap={5}>
          <Title order={3}>{common.getUserFullName(resident as User)}</Title>
          <Badge
            variant={type.getTypeVariant(resident?.type ?? '')}
            style={{ width: 'max-content' }}
          >
            {t(type.getFormattedTypeName(resident?.type ?? ''))}
          </Badge>
        </Flex>
        <Flex className={classes.infoContainer}>
          <Flex>
            <Text variant="subtitle" w="15%">
              {t('forms.user.data.label.address')}:
            </Text>
            <InlineEdit.Input
              value={common.getFormattedAddress({
                address: resident?.address,
              } as Site)}
              onSetValue={(value: string) => {
                const parsedAddress = value.split(',');
                updateUser({
                  id: resident?.id,
                  address: {
                    ...resident?.address,
                    street: parsedAddress[0] || '-',
                    number: parsedAddress[1] || '-',
                    postalCode: parsedAddress[2] || '-',
                    city: parsedAddress[3] || '-',
                  } as Address,
                });
              }}
              classNames={{ text: 'text' }}
            />
          </Flex>
          <Flex>
            <Text variant="subtitle" w="15%">
              {t('forms.user.data.label.phone')}:
            </Text>
            <InlineEdit.Input
              value={resident?.phone ?? '-'}
              onSetValue={(value: string) =>
                updateUser({
                  id: resident?.id,
                  phone: value,
                })
              }
              classNames={{ text: 'text' }}
            />
          </Flex>
          <Flex>
            <Text variant="subtitle" w="15%">
              {t('forms.user.data.label.email')}:
            </Text>
            <InlineEdit.Input
              value={resident?.email ?? '-'}
              onSetValue={(value: string) =>
                updateUser({
                  id: resident?.id,
                  email: value,
                })
              }
              classNames={{ text: 'text' }}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default memo(General);
