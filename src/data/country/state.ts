import { atom } from 'recoil';

import { Pagination } from '@/common/models';

import { CountryState } from './interfaces';

const countryAtom = atom<CountryState>({
  key: 'countries',
  default: {
    countries: [],
    pagination: new Pagination(),
    areCountriesLoading: false,
  },
});

export default { countryAtom };
