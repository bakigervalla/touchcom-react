import { atom } from 'recoil';

import { Pagination } from '@/common/models';

import { VersionState } from './interfaces';

const versionAtom = atom<VersionState>({
  key: 'versions',
  default: {
    versions: [],
    pagination: new Pagination(),
    areVersionsLoading: false,
  },
});

export default { versionAtom };
