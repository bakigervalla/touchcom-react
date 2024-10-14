import { Badge, Button, Flex, Group, Modal, Radio, Text } from '@mantine/core';
import { DateInput, DateValue } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';

import {
  ConfirmationDialog,
  InlineEdit,
  Loaders,
  TimeSchedules,
} from '@/components';
import { accessKey, device, user } from '@/data';
import {
  ArrowDownIcon,
  ClockIcon,
  NotFoundDeviceIcon,
  NotFoundUserIcon,
} from '@/icons';

import { pagination, placeholders } from '@/common/constants';
import { AccessKeyFilter } from '@/common/interfaces';
import {
  AccessKey,
  AccessKeyStatus,
  Device,
  User,
  UserType,
} from '@/common/models';
import { common, status, type } from '@/common/utils';

import { AttachEntity, SelectedEntryTimes } from './components';
import useStyles from './useStyles';

interface DetailsProps {
  filters: AccessKeyFilter;
  onClose: () => void;
}

const Details = ({ filters, onClose }: DetailsProps) => {
  const { t } = useTranslation();
  const { classes } = useStyles();
  const [
    isPinEntryTimeDialogOpened,
    { open: openPinEntryTimeDialog, close: closePinEntryTimeDialog },
  ] = useDisclosure(false);
  const [opened, { toggle, close }] = useDisclosure(false);
  const {
    updateAccessKey,
    removeAccessKey,
    getAccessKeyTimeSchedule,
    attachAccessKeyToUserAndDevice,
    createOrUpdateAccessKeyTimeSchedule: upsertAccessKey,
    removeAccessKeyTimeScheduleAccessTime: removeAccessTime,
  } = accessKey.actions();
  const { getUsers } = user.actions();
  const { getDevices } = device.actions();
  const {
    accessKey: accessKeyData,
    isAccessKeyLoading,
    isAccessKeyTimeScheduleLoading,
  } = useRecoilValue(accessKey.state.accessKeyAtom);
  const { residents } = useRecoilValue(user.state.residentAtom);
  const { devices } = useRecoilValue(device.state.deviceAtom);

  const userSearchData = useMemo(
    () => ({
      notFound: {
        label: 'notFound.users.label',
        description: 'notFound.users.attachUserDescription',
        icon: NotFoundUserIcon,
      },
      data: residents.map((data) => ({
        id: data.id,
        title: common.getUserFullName(data as User) ?? '-',
        imageUrl: data.imageUrl ?? '-',
        subtitle: data.email,
      })),
      placeholder: 'buttons.newUser',
    }),
    [residents],
  );

  const userInfoData = useMemo(
    () =>
      accessKeyData?.accessControl && accessKeyData?.accessControl?.user
        ? {
            id: accessKeyData?.accessControl?.user?.id ?? 0,
            imageUrl:
              accessKeyData?.accessControl?.user?.imageUrl ||
              `${placeholders.IMAGE_PLACEHOLDERS_URL}/${placeholders.USER_PLACEHOLDER.USER_A}`,
            title:
              common.getUserFullName(
                accessKeyData?.accessControl?.user as User,
              ) ?? '-',
          }
        : null,
    [accessKeyData],
  );

  const deviceSearchData = useMemo(
    () => ({
      notFound: {
        label: 'notFound.devices.label',
        description: 'notFound.devices.attachDeviceDescription',
        icon: NotFoundDeviceIcon,
      },
      data: devices.map((data) => ({
        id: data.id,
        title: data.name ?? '-',
        imageUrl: data.imageUrl ?? '-',
        subtitle: common.getFormattedAddress(data.site),
      })),
      placeholder: 'page.devices.newDevice',
    }),
    [devices],
  );

  const deviceInfoData = useMemo(
    () =>
      accessKeyData?.accessControl && accessKeyData?.accessControl?.device
        ? {
            id: (accessKeyData?.accessControl?.device as Device)?.id ?? 0,
            imageUrl:
              (accessKeyData?.accessControl?.device as Device)?.imageUrl ||
              `${placeholders.IMAGE_PLACEHOLDERS_URL}/${placeholders.DEVICE_PLACEHOLDER.DEVICE_A}`,
            title: (accessKeyData?.accessControl?.device as Device)?.name ?? '',
          }
        : null,
    [accessKeyData],
  );

  const handleSearchUsers = useCallback(
    (search: string) =>
      getUsers(
        {
          page: pagination.DEFAULT_PAGE,
          pageSize: pagination.ACCESS_KEYS.USERS.PAGE_SIZE,
        },
        { search: search || '-', type: UserType.RESIDENT },
      ),
    [getUsers],
  );

  const handleSearchDevices = useCallback(
    (search: string) =>
      getDevices(
        {
          page: pagination.DEFAULT_PAGE,
          pageSize: pagination.ACCESS_KEYS.DEVICES.PAGE_SIZE,
        },
        { search: search || '-' },
      ),
    [getDevices],
  );

  const handleRemoveAccessKey = useCallback(() => {
    close();
    onClose();
    removeAccessKey(accessKeyData as AccessKey);
  }, [close, accessKeyData, onClose, removeAccessKey]);

  useEffect(() => {
    if (accessKeyData?.id) {
      getAccessKeyTimeSchedule(accessKeyData.id);
    }
  }, [accessKeyData?.id, getAccessKeyTimeSchedule]);

  if (isAccessKeyLoading || isAccessKeyTimeScheduleLoading) {
    return (
      <Flex pos="relative" h="100%">
        <Loaders.Overlay />
      </Flex>
    );
  }

  return (
    <Flex className={classes.detailsContainer}>
      <Flex align="center">
        <Text w="40%" variant="subtitle">
          {t('forms.accessKey.data.label.name')}
        </Text>
        <InlineEdit.Input
          value={accessKeyData?.name ?? '-'}
          onSetValue={(value) =>
            updateAccessKey({ ...accessKeyData, name: value }, filters)
          }
        />
      </Flex>
      <Flex align="center">
        <Text w="40%" variant="subtitle">
          {t('forms.accessKey.data.label.number')}
        </Text>
        <InlineEdit.Input
          value={accessKeyData?.number ?? '-'}
          onSetValue={(value) =>
            updateAccessKey({ ...accessKeyData, number: value }, filters)
          }
        />
      </Flex>
      <Flex align="center">
        <Text w="40%" variant="subtitle">
          {t('forms.accessKey.data.label.tag')}
        </Text>
        <Text>{accessKeyData?.tag}</Text>
      </Flex>
      <Flex align="center">
        <Text w="40%" variant="subtitle">
          {t('forms.accessKey.data.label.keyType')}
        </Text>
        <Badge variant={type.getTypeVariant(accessKeyData?.type ?? '')}>
          {t(type.getFormattedTypeName(accessKeyData?.type ?? ''))}
        </Badge>
      </Flex>
      <Flex align="center">
        <Text w="40%" variant="subtitle">
          {t('forms.accessKey.data.label.status')}
        </Text>
        <Radio.Group
          name="status"
          defaultValue={accessKeyData?.status}
          onChange={(value) =>
            updateAccessKey(
              { ...accessKeyData, status: value as AccessKeyStatus },
              filters,
            )
          }
        >
          <Group mt="xs">
            {Object.values(AccessKeyStatus).map((keyStatus: string) => (
              <Radio
                radioGroup="status"
                key={keyStatus}
                value={keyStatus}
                label={t(status.getFormattedStatusName(keyStatus))}
              />
            ))}
          </Group>
        </Radio.Group>
      </Flex>
      <Flex align="center">
        <Text w="40%" variant="subtitle">
          {t('forms.accessKey.data.label.belongsTo')}
        </Text>
        <AttachEntity
          search={userSearchData}
          infoData={userInfoData}
          handleSearch={handleSearchUsers}
          attachKeyAction={(user) =>
            attachAccessKeyToUserAndDevice(
              accessKeyData?.id ?? 0,
              user.id,
              undefined,
            )
          }
        />
      </Flex>
      <Flex align="center">
        <Text w="40%" variant="subtitle">
          {t('forms.accessKey.data.label.connectedDevice')}
        </Text>
        <AttachEntity
          infoImageRadius="sm"
          search={deviceSearchData}
          infoData={deviceInfoData}
          handleSearch={handleSearchDevices}
          attachKeyAction={(device) =>
            attachAccessKeyToUserAndDevice(
              accessKeyData?.id ?? 0,
              undefined,
              device.id,
            )
          }
        />
      </Flex>
      <Flex align="center">
        <Text w="40%" variant="subtitle">
          {t('forms.accessKey.data.label.valid')}
        </Text>
        <Flex gap={10} w="60%">
          <DateInput
            w="50%"
            popoverProps={{
              withinPortal: true,
              position: 'bottom-start',
            }}
            dateParser={(input: string) => new Date(input)}
            valueFormat="MM/DD/YYYY"
            placeholder="23/12/2023"
            clearable
            value={
              accessKeyData?.validFrom
                ? new Date(accessKeyData?.validFrom)
                : undefined
            }
            onChange={(value: DateValue) =>
              updateAccessKey({
                ...accessKeyData,
                validFrom: value,
              })
            }
          />
          <DateInput
            w="50%"
            popoverProps={{
              withinPortal: true,
              position: 'bottom-start',
            }}
            dateParser={(input: string) => new Date(input)}
            valueFormat="MM/DD/YYYY"
            placeholder="23/12/2023"
            clearable
            value={
              accessKeyData?.validTo
                ? new Date(accessKeyData?.validTo)
                : undefined
            }
            onChange={(value: DateValue) =>
              updateAccessKey({
                ...accessKeyData,
                validTo: value,
              })
            }
          />
        </Flex>
      </Flex>
      <Flex align="center">
        <Text w="40%" variant="subtitle">
          {t('forms.accessKey.data.label.pin')}
        </Text>
        <InlineEdit.Input
          value={accessKeyData?.pin ?? ''}
          onSetValue={(value) =>
            updateAccessKey({ ...accessKeyData, pin: value }, filters)
          }
          classNames={{ text: 'text' }}
        />
      </Flex>
      <Flex className={classes.entryTimeContainer}>
        <Text w="40%" variant="subtitle">
          {t('forms.accessKey.data.label.pinEntryTime')}
        </Text>
        <Flex w="60%" align="center">
          <Button
            variant="filter"
            leftIcon={<ClockIcon size={15} />}
            rightIcon={<ArrowDownIcon size={13} />}
            onClick={openPinEntryTimeDialog}
            style={{ fontSize: 12 }}
          >
            {t('common.configure')}
          </Button>
          <Button
            ml="auto"
            variant="subtle"
            rightIcon={<ArrowDownIcon size={12} />}
            onClick={openPinEntryTimeDialog}
          >
            {t('common.seeAll')}
          </Button>
        </Flex>
      </Flex>
      <Flex w="62%" ml="auto">
        <SelectedEntryTimes
          onMoreClick={openPinEntryTimeDialog}
          timeScheduleAccessTimes={
            accessKeyData?.accessTimeSchedule?.accessTimes ?? []
          }
        />
      </Flex>
      <Button variant="neutral" ml="auto" onClick={toggle}>
        {t('common.delete')}
      </Button>
      <Modal
        title={t('dialogs.accessKeys.pinCodeEntryTime.title')}
        size="lg"
        centered
        opened={isPinEntryTimeDialogOpened}
        onClose={closePinEntryTimeDialog}
      >
        <TimeSchedules
          disabled={false}
          data={accessKeyData}
          upsertData={upsertAccessKey}
          isDataLoading={isAccessKeyTimeScheduleLoading}
          removeAccessTime={removeAccessTime}
        />
      </Modal>
      <ConfirmationDialog
        isOpened={opened}
        positiveButtonText={t('common.confirm')}
        negativeButtonText={t('common.cancel')}
        text={t('dialogs.accessKeys.delete.confirmationText')}
        title={t('dialogs.accessKeys.delete.confirmationTitle')}
        negativeButtonClick={close}
        positiveButtonClick={handleRemoveAccessKey}
      />
    </Flex>
  );
};

export default memo(Details);
