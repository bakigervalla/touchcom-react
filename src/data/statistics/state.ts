import { atom } from 'recoil';

import { Statistics } from '@/common/models';

import { StatisticsState } from './interfaces';

const statisticsAtom = atom<StatisticsState>({
  key: 'statistics',
  default: {
    statistics: {} as Statistics,
    areStatisticsLoading: true,
  },
});

export default { statisticsAtom };
