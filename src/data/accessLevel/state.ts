import { atom, selector } from 'recoil';

import { Pagination } from '@/common/models';

import { AccessLevelState } from './interfaces';

const accessLevelAtom = atom<AccessLevelState>({
  key: 'accessLevels',
  default: {
    accessLevels: [],
    accessLevel: null,
    usersNotConnectedToAccessLevel: [],
    devicesNotConnectedToAccessLevel: [],
    pagination: new Pagination(),
    usersNotConnectedToAccessLevelPagination: new Pagination(),
    devicesNotConnectedToAccessLevelPagination: new Pagination(),
    isAccessLevelLoading: false,
    areAccessLevelsLoading: false,
    areAccessLevelDevicesLoading: false,
    areAccessLevelUsersLoading: false,
    areAccessLevelExceptionsLoading: false,
    isAccessLevelTimeScheduleLoading: false,
    areUsersNotConnectedToAccessLevelLoading: false,
    areDevicesNotConnectedToAccessLevelLoading: false,
  },
});

const accessLevel = selector({
  key: 'accessLevel',
  get: ({ get }) => get(accessLevelAtom).accessLevel,
});

export default { accessLevelAtom, accessLevel };
