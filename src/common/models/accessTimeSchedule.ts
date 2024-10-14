import { AccessTime } from './accessTime';

export enum Day {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
}

export interface TimeScheduleAccessTime {
  id: number;
  timeScheduleId: number;
  timeSchedule: AccessTime;
  accessTimeId: number;
  accessTime: AccessTime;
  day: Day;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AccessTimeSchedule {
  id: number;
  applyEveryDay: boolean;
  applyWholeMonday: boolean;
  applyWholeTuesday: boolean;
  applyWholeWednesday: boolean;
  applyWholeThursday: boolean;
  applyWholeFriday: boolean;
  applyWholeSaturday: boolean;
  applyWholeSunday: boolean;
  accessTimes?: TimeScheduleAccessTime[];
  createdAt?: Date;
  updatedAt?: Date;
}
