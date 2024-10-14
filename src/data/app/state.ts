import { atom } from 'recoil';

import { AppState } from './interfaces';

const appAtom = atom<AppState>({
  key: 'app',
  default: {
    snackbarKeys: [],
  },
});

export default { appAtom };
