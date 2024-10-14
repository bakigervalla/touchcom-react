import React, { memo, useEffect, useMemo } from 'react';

import { version } from '@/data';
import { useWizard } from '@/hooks';

import Wizard from '@/components/Wizard/Wizard';

import {
  Address,
  Configuration,
  CreateDevice,
  DeviceType,
  LockStatus,
  ScreenSize,
  User,
  Version,
} from '@/common/models';

import steps from './steps';

interface NewDeviceProps {
  handleClose: () => void;
  handleCreateDevice: (wizardState: CreateDevice) => void;
}

const NewDevice = ({ handleClose, handleCreateDevice }: NewDeviceProps) => {
  const { getVersions } = version.actions();

  const wizardProps = useWizard(useMemo(steps, []), false, {
    name: '',
    type: DeviceType.VISITOR_PANEL,
    version: {} as Version,
    floor: 0,
    address: {} as Address,
    configuration: {
      lockStatus: LockStatus.OPEN,
      screenSize: ScreenSize.INCH_10,
      heartbeatInterval: 300,
      mainScreenDelay: 30,
      waitBranchLevel: 20,
      activeBranchLevel: 100,
      volumeLevel: 100,
      horizontal: false,
      rotation: 90,
      cameraRotation: 0,
      scaling: 100,
      closeDoorTime: 10,
      callTimeout: 30,
      height: undefined,
      width: undefined,
      aspectRatioX: undefined,
      aspectRatioY: undefined,
      adbPort: 5555,
      isDarkTheme: false,
      darkThemeStart: undefined,
      darkThemeEnd: undefined,
    } as Partial<Configuration>,
    credentials: {} as Pick<User, 'email' | 'password' | 'confirmPassword'>,
  });

  useEffect(() => {
    getVersions();
  }, [getVersions]);

  return (
    <Wizard<CreateDevice>
      wizardProps={wizardProps}
      showNavigationButtons
      handleClose={handleClose}
      handleSubmit={handleCreateDevice}
    >
      {wizardProps.Component(wizardProps)}
    </Wizard>
  );
};

export default memo(NewDevice);
