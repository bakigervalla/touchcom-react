import { atom, selector } from 'recoil';

import { Pagination } from '@/common/models';

import { AccessKeyState } from './interfaces';

const accessKeyAtom = atom<AccessKeyState>({
  key: 'accessKeys',
  default: {
    accessKeys: [],
    accessKey: null,
    userAccessKeys: [],
    accessKeysNotConnectedToUser: [],
    accessKeysOverview: null,
    isAccessKeyLoading: false,
    areAccessKeysLoading: false,
    areUserAccessKeysLoading: false,
    isAccessKeysOverviewLoading: false,
    isAccessKeyTimeScheduleLoading: false,
    areAccessKeysNotConnectedToUserLoading: false,
    pagination: new Pagination(),
    userAccessKeysPagination: new Pagination(),
    accessKeysNotConnectedToUserPagination: new Pagination(),
  },
});

const accessKey = selector({
  key: 'accessKey',
  get: ({ get }) => get(accessKeyAtom).accessKey,
});

export default { accessKeyAtom, accessKey };
