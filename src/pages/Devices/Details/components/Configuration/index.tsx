/* eslint-disable react/jsx-props-no-spreading */
import { Badge, Box, Button, Flex, Select, Text } from '@mantine/core';
import { DateInput, DateValue } from '@mantine/dates';
import React, { forwardRef, memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';

import { CustomSlider, InlineEdit, Loaders } from '@/components';
import { auth, device, event } from '@/data';
import { DeviceEvent } from '@/data/event/interfaces';
import { ArrowDownIcon } from '@/icons';

import { Device, LockStatus } from '@/common/models';
import { status } from '@/common/utils';

import useStyles from './useStyles';

interface StatusProps extends React.ComponentPropsWithoutRef<'div'> {
  label: string;
}

const Status = forwardRef<HTMLDivElement, StatusProps>(
  ({ label, ...rest }: StatusProps, ref) => (
    <Box ref={ref} {...rest}>
      <Badge variant={status.getStatusVariant(label.toUpperCase())}>
        {label}
      </Badge>
    </Box>
  ),
);
Status.displayName = 'Status';

const Configuration = () => {
  const { t } = useTranslation();
  const { classes } = useStyles();
  const { eventHandler } = event.actions();
  const { getDeviceConfiguration, updateDevice } = device.actions();
  const { user } = useRecoilValue(auth.state.authAtom);
  const { device: deviceData, isDeviceConfigurationLoading } = useRecoilValue(
    device.state.deviceAtom,
  );

  useEffect(() => {
    if (deviceData?.id) {
      getDeviceConfiguration(deviceData.id);
    }
  }, [deviceData?.id, getDeviceConfiguration]);

  if (isDeviceConfigurationLoading) {
    return (
      <Flex pos="relative" h="100%">
        <Loaders.Overlay />
      </Flex>
    );
  }

  return (
    <Flex className={classes.configurationContainer}>
      <Button
        ml="auto"
        className={classes.button}
        onClick={() =>
          eventHandler({
            deviceId: deviceData?.id ?? 0,
            event: DeviceEvent.MAIN_SETTINGS_UPDATE,
            options: { isWebTrigger: true },
          })
        }
      >
        {t('common.syncToDevice')}
      </Button>
      <Flex gap={28}>
        <Flex direction="column" gap={6} w="25%">
          <Text className={classes.label}>
            {t('forms.device.data.configuration.label.height')}
          </Text>
          <InlineEdit.Input
            type="number"
            value={deviceData?.configuration?.height?.toString() ?? '-'}
            classNames={{ text: classes.text }}
            onSetValue={(value: string) => {
              updateDevice({
                ...(deviceData as Device),
                configuration: {
                  ...deviceData?.configuration,
                  height: parseInt(value, 10),
                },
              });
            }}
          />
        </Flex>
        <Flex direction="column" gap={6} w="25%">
          <Text className={classes.label}>
            {t('forms.device.data.configuration.label.width')}
          </Text>
          <InlineEdit.Input
            type="number"
            value={deviceData?.configuration?.width?.toString() ?? '-'}
            classNames={{ text: classes.text }}
            onSetValue={(value: string) => {
              updateDevice({
                ...(deviceData as Device),
                configuration: {
                  ...deviceData?.configuration,
                  width: parseInt(value, 10),
                },
              });
            }}
          />
        </Flex>
        <Flex direction="column" gap={6} w="25%">
          <Text className={classes.label}>
            {t('forms.device.data.configuration.label.aspectRatioX')}
          </Text>
          <InlineEdit.Input
            type="number"
            value={deviceData?.configuration?.aspectRatioX?.toString() ?? '-'}
            classNames={{ text: classes.text }}
            onSetValue={(value: string) => {
              updateDevice({
                ...(deviceData as Device),
                configuration: {
                  ...deviceData?.configuration,
                  aspectRatioX: parseInt(value, 10),
                },
              });
            }}
          />
        </Flex>
        <Flex direction="column" gap={6} w="25%">
          <Text className={classes.label}>
            {t('forms.device.data.configuration.label.aspectRatioY')}
          </Text>
          <InlineEdit.Input
            type="number"
            value={deviceData?.configuration?.aspectRatioY?.toString() ?? '-'}
            classNames={{ text: classes.text }}
            onSetValue={(value: string) => {
              updateDevice({
                ...(deviceData as Device),
                configuration: {
                  ...deviceData?.configuration,
                  aspectRatioY: parseInt(value, 10),
                },
              });
            }}
          />
        </Flex>
        <Flex direction="column" gap={6} w="25%">
          <Text className={classes.label}>
            {t('forms.device.data.configuration.label.adbPort')}
          </Text>
          <InlineEdit.Input
            type="number"
            value={deviceData?.configuration?.adbPort?.toString() ?? '-'}
            classNames={{ text: classes.text }}
            onSetValue={(value: string) => {
              updateDevice({
                ...(deviceData as Device),
                configuration: {
                  ...deviceData?.configuration,
                  adbPort: parseInt(value, 10),
                },
              });
            }}
          />
        </Flex>
        <Select
          w="25%"
          variant="underlined"
          className={classes.select}
          data={[
            { label: 'Yes', value: 'true' },
            { label: 'No', value: 'false' },
          ]}
          label={t('forms.device.data.configuration.label.isDarkTheme')}
          onChange={(value: string) => {
            updateDevice({
              ...(deviceData as Device),
              configuration: {
                ...deviceData?.configuration,
                isDarkTheme: value === 'true',
              },
            });
          }}
          value={deviceData?.configuration?.isDarkTheme?.toString()}
          rightSection={<ArrowDownIcon size={18} />}
        />
        {deviceData?.configuration?.isDarkTheme && (
          <>
            <Flex direction="column" gap={6} w="25%">
              <Text className={classes.label}>
                {t('forms.device.data.configuration.label.darkThemeStart')}
              </Text>
              <DateInput
                popoverProps={{ position: 'bottom-start' }}
                labelProps={{ className: classes.label }}
                dateParser={(input: string) => new Date(input)}
                value={
                  deviceData.configuration.darkThemeStart
                    ? new Date(deviceData.configuration.darkThemeStart)
                    : undefined
                }
                valueFormat="MM/DD/YYYY"
                placeholder="01/22/2023"
                clearable
                onChange={(value: DateValue) =>
                  updateDevice({
                    ...deviceData,
                    configuration: {
                      ...deviceData?.configuration,
                      darkThemeStart: value as Date,
                    },
                  })
                }
              />
            </Flex>
            <Flex direction="column" gap={6} w="25%">
              <Text className={classes.label}>
                {t('forms.device.data.configuration.label.darkThemeEnd')}
              </Text>
              <DateInput
                popoverProps={{ position: 'bottom-start' }}
                labelProps={{ className: classes.label }}
                dateParser={(input: string) => new Date(input)}
                value={
                  deviceData.configuration.darkThemeEnd
                    ? new Date(deviceData.configuration.darkThemeEnd)
                    : undefined
                }
                valueFormat="MM/DD/YYYY"
                placeholder="01/22/2023"
                clearable
                onChange={(value: DateValue) =>
                  updateDevice({
                    ...deviceData,
                    configuration: {
                      ...deviceData?.configuration,
                      darkThemeEnd: value as Date,
                    },
                  })
                }
              />
            </Flex>
          </>
        )}
      </Flex>
      <Flex gap={28}>
        <Select
          variant="underlined"
          className={classes.select}
          data={Object.values(LockStatus).map((lockStatus) => ({
            label: t(status.getFormattedStatusName(lockStatus)),
            value: lockStatus,
          }))}
          label={t('Lock Status')}
          itemComponent={Status}
          onChange={(value: string) => {
            updateDevice({
              ...(deviceData as Device),
              configuration: {
                ...deviceData?.configuration,
                lockStatus: value as LockStatus,
              },
            });
            eventHandler({
              deviceId: deviceData?.id ?? 0,
              event: DeviceEvent.OPEN_DOOR,
              options: { id: user?.id ?? 0, isWebTrigger: true },
            });
          }}
          value={deviceData?.configuration?.lockStatus}
          rightSection={<ArrowDownIcon size={18} />}
        />
        <Select
          variant="underlined"
          className={classes.select}
          data={[
            { label: '10s', value: '10' },
            { label: '30s', value: '30' },
            { label: '5min', value: '300' },
            { label: '10min', value: '600' },
          ]}
          label={t('forms.device.data.configuration.label.heartbeatInterval')}
          onChange={(value: string) => {
            updateDevice({
              ...(deviceData as Device),
              configuration: {
                ...deviceData?.configuration,
                heartbeatInterval: parseInt(value, 10),
              },
            });
          }}
          value={deviceData?.configuration?.heartbeatInterval?.toString()}
          rightSection={<ArrowDownIcon size={18} />}
        />
        <Select
          variant="underlined"
          className={classes.select}
          data={[
            { label: '10s', value: '10' },
            { label: '30s', value: '30' },
            { label: '5min', value: '300' },
            { label: '10min', value: '600' },
          ]}
          label={t('forms.device.data.configuration.label.mainScreenDelay')}
          onChange={(value: string) => {
            updateDevice({
              ...(deviceData as Device),
              configuration: {
                ...deviceData?.configuration,
                mainScreenDelay: parseInt(value, 10),
              },
            });
          }}
          value={deviceData?.configuration?.mainScreenDelay?.toString()}
          rightSection={<ArrowDownIcon size={18} />}
        />
        <Select
          variant="underlined"
          className={classes.select}
          data={[
            { label: '10s', value: '10' },
            { label: '20s', value: '20' },
            { label: '30s', value: '30' },
            { label: '5min', value: '300' },
            { label: '10min', value: '600' },
          ]}
          label={t('forms.device.data.configuration.label.waitBranchLevel')}
          onChange={(value: string) => {
            updateDevice({
              ...(deviceData as Device),
              configuration: {
                ...deviceData?.configuration,
                waitBranchLevel: parseInt(value, 10),
              },
            });
          }}
          value={deviceData?.configuration?.waitBranchLevel?.toString()}
          rightSection={<ArrowDownIcon size={18} />}
        />
        <Select
          variant="underlined"
          className={classes.select}
          data={[
            { label: '10s', value: '10' },
            { label: '30s', value: '30' },
            { label: '5min', value: '300' },
            { label: '10min', value: '600' },
          ]}
          label={t('forms.device.data.configuration.label.closeDoorTime')}
          onChange={(value: string) => {
            updateDevice({
              ...(deviceData as Device),
              configuration: {
                ...deviceData?.configuration,
                closeDoorTime: parseInt(value, 10),
              },
            });
          }}
          value={deviceData?.configuration?.closeDoorTime?.toString()}
          rightSection={<ArrowDownIcon size={18} />}
        />
      </Flex>
      <Flex gap={28}>
        <Select
          variant="underlined"
          className={classes.select}
          data={[
            { label: '0°', value: '0' },
            { label: '90°', value: '90' },
            { label: '180°', value: '180' },
            { label: '270°', value: '270' },
          ]}
          label={t('forms.device.data.configuration.label.deviceRotation')}
          onChange={(value: string) => {
            updateDevice({
              ...(deviceData as Device),
              configuration: {
                ...deviceData?.configuration,
                rotation: parseInt(value, 10),
              },
            });
          }}
          value={deviceData?.configuration?.rotation?.toString()}
          rightSection={<ArrowDownIcon size={18} />}
        />
        <Select
          variant="underlined"
          className={classes.select}
          data={[
            { label: 'Yes', value: 'true' },
            { label: 'No', value: 'false' },
          ]}
          label={t('forms.device.data.configuration.label.isHorizontal')}
          onChange={(value: string) => {
            updateDevice({
              ...(deviceData as Device),
              configuration: {
                ...deviceData?.configuration,
                horizontal: value === 'true',
              },
            });
          }}
          value={deviceData?.configuration?.horizontal?.toString()}
          rightSection={<ArrowDownIcon size={18} />}
        />
        <Flex direction="column">
          <Text>
            {t('forms.device.data.configuration.label.activeBranchLevel')}
          </Text>
          <CustomSlider
            value={deviceData?.configuration?.activeBranchLevel}
            handleChange={(value: number) => {
              updateDevice({
                ...(deviceData as Device),
                configuration: {
                  ...deviceData?.configuration,
                  activeBranchLevel: value,
                },
              });
            }}
          />
        </Flex>
        <Flex direction="column">
          <Text>{t('forms.device.data.configuration.label.volumeLevel')}</Text>
          <CustomSlider
            value={deviceData?.configuration?.volumeLevel}
            handleChange={(value: number) => {
              updateDevice({
                ...(deviceData as Device),
                configuration: {
                  ...deviceData?.configuration,
                  volumeLevel: value,
                },
              });
            }}
          />
        </Flex>
      </Flex>
      <Flex gap={28}>
        <Select
          variant="underlined"
          className={classes.select}
          data={[
            { label: '0°', value: '0' },
            { label: '90°', value: '90' },
            { label: '180°', value: '180' },
            { label: '270°', value: '270' },
          ]}
          label={t('forms.device.data.configuration.label.cameraRotation')}
          onChange={(value: string) => {
            updateDevice({
              ...(deviceData as Device),
              configuration: {
                ...deviceData?.configuration,
                cameraRotation: parseInt(value, 10),
              },
            });
          }}
          value={deviceData?.configuration?.cameraRotation?.toString()}
          rightSection={<ArrowDownIcon size={18} />}
        />
        <Select
          variant="underlined"
          className={classes.select}
          data={[
            { label: '10s', value: '10' },
            { label: '20s', value: '20' },
            { label: '30s', value: '30' },
            { label: '5min', value: '300' },
            { label: '10min', value: '600' },
          ]}
          label={t('forms.device.data.configuration.label.callTimeout')}
          onChange={(value: string) => {
            updateDevice({
              ...(deviceData as Device),
              configuration: {
                ...deviceData?.configuration,
                callTimeout: parseInt(value, 10),
              },
            });
          }}
          value={deviceData?.configuration?.callTimeout?.toString()}
          rightSection={<ArrowDownIcon size={18} />}
        />
        <Flex direction="column">
          <Text>{t('forms.device.data.configuration.label.scaling')}</Text>
          <CustomSlider
            value={deviceData?.configuration?.scaling}
            handleChange={(value: number) => {
              updateDevice({
                ...(deviceData as Device),
                configuration: { ...deviceData?.configuration, scaling: value },
              });
            }}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default memo(Configuration);
