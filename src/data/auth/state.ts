import { atom, selector } from 'recoil';

import { Site } from '@/common/models';
import { common } from '@/common/utils';

import { AuthState } from './interfaces';

const authAtom = atom<AuthState>({
  key: 'auth',
  default: {
    user: null,
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
  },
});

const userSiteLocation = selector({
  key: 'userSiteLocation',
  get: ({ get }) => {
    const { user } = get(authAtom);

    return common.getFormattedAddress(user?.activeSite as Site);
  },
});

export default { authAtom, userSiteLocation };
