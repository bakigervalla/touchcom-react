export enum LockStatus {
  OPEN = 'OPEN',
  CLOSE = 'CLOSE',
}

export enum ScreenSize {
  INCH_10 = 'INCH_10',
  INCH_13 = 'INCH_13 ',
}

export interface Configuration {
  id: number;
  lockStatus: LockStatus;
  screenSize: ScreenSize;
  heartbeatInterval: number;
  mainScreenDelay: number;
  waitBranchLevel: number;
  activeBranchLevel: number;
  volumeLevel: number;
  horizontal: boolean;
  rotation: number;
  cameraRotation: number;
  scaling: number;
  closeDoorTime: number;
  callTimeout: number;
  height?: number;
  width?: number;
  aspectRatioX?: number;
  aspectRatioY?: number;
  adbPort: number;
  isDarkTheme: boolean;
  darkThemeStart?: Date;
  darkThemeEnd?: Date;
  createdAt: Date;
  updatedAt: Date;
}
