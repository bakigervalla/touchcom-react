import { Accordion, Avatar, Badge, Flex, Skeleton, Text } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import moment from 'moment';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';

import { InlineEdit } from '@/components';
import { device } from '@/data';
import { ArrowDownIcon } from '@/icons';

import { data, placeholders } from '@/common/constants';
import { Device } from '@/common/models';
import { status, type } from '@/common/utils';

import useStyles from './useStyles';

const AdditionalInfo = () => {
  const { t } = useTranslation();
  const { classes } = useStyles();
  const { updateDevice } = device.actions();
  const { device: deviceData, isDeviceLoading } = useRecoilValue(
    device.state.deviceAtom,
  );

  return (
    <Accordion
      className={classes.additionalInfoContainer}
      defaultValue="general"
      defaultChecked
      chevron={<ArrowDownIcon size={20} />}
    >
      <Accordion.Item value="general">
        <Accordion.Control icon={<IconInfoCircle size={20} />}>
          {t('common.generalInformation')}
        </Accordion.Control>
        <Accordion.Panel>
          {isDeviceLoading ? (
            <Flex gap={32}>
              <Flex w="33%" direction="column" gap={15}>
                <Skeleton height={12} width="70%" radius="xl" />
                <Skeleton height={12} width="70%" radius="xl" />
              </Flex>
              <Flex w="33%" direction="column" gap={15}>
                <Skeleton height={12} width="70%" radius="xl" />
                <Skeleton height={12} width="70%" radius="xl" />
              </Flex>
              <Flex w="33%" direction="column" gap={15}>
                <Skeleton height={12} width="70%" radius="xl" />
                <Skeleton height={12} width="70%" radius="xl" />
              </Flex>
            </Flex>
          ) : (
            <Flex gap={32}>
              <Flex w="33%" direction="column" gap={6}>
                <Flex>
                  <Text w="50%">{t('forms.device.data.label.deviceType')}</Text>
                  <Badge variant={type.getTypeVariant(deviceData?.type ?? '-')}>
                    {t(type.getFormattedTypeName(deviceData?.type ?? '-'))}
                  </Badge>
                </Flex>
                <Flex align="center" gap={8}>
                  <Text w="49%">
                    {t('forms.device.data.label.connectedPerson')}
                  </Text>
                  <Avatar
                    size="sm"
                    radius="xl"
                    src={
                      deviceData?.connectedUser?.imageUrl ||
                      `${placeholders.IMAGE_PLACEHOLDERS_URL}/${placeholders.SITE_PLACEHOLDER.SITE_A}`
                    }
                  />
                  <Text variant="subtitle">
                    {deviceData?.connectedUser?.email ?? '-'}
                  </Text>
                </Flex>
              </Flex>
              <Flex w="33%" direction="column" gap={6}>
                <Flex>
                  <Text w="50%">
                    {t('forms.device.data.configuration.label.lockStatus')}
                  </Text>
                  <Badge
                    variant={status.getStatusVariant(
                      deviceData?.configuration?.lockStatus ?? '',
                    )}
                  >
                    {t(
                      status.getFormattedStatusName(
                        deviceData?.configuration?.lockStatus ?? '',
                      ),
                    )}
                  </Badge>
                </Flex>
                <Flex>
                  <Text w="50%">{t('forms.device.data.label.floor')}</Text>
                  <InlineEdit.Select
                    data={data.FLOORS}
                    selected={{
                      label: deviceData?.floor.toString() ?? '0',
                      value: deviceData?.floor.toString() ?? '0',
                    }}
                    onSetValue={(value: string) => {
                      updateDevice({
                        ...(deviceData as Device),
                        floor: parseInt(value, 10),
                      });
                    }}
                    classNames={{ text: classes.text }}
                  />
                </Flex>
              </Flex>
              <Flex w="33%" direction="column" gap={6}>
                <Flex>
                  <Text w="50%">{t('common.createdAt')}</Text>
                  <Text variant="subtitle">
                    {moment(deviceData?.createdAt).format('DD/MM/YYYY HH:mm')}
                  </Text>
                </Flex>
                <Flex>
                  <Text w="50%">{t('common.updatedAt')}</Text>
                  <Text variant="subtitle">
                    {moment(deviceData?.updatedAt).format('DD/MM/YYYY HH:mm')}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          )}
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

export default memo(AdditionalInfo);
