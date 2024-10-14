import { atom, selector } from 'recoil';

import { Pagination } from '@/common/models';

import auth from '../auth';

import { SiteState } from './interfaces';

const siteAtom = atom<SiteState>({
  key: 'sites',
  default: {
    sites: [],
    site: null,
    sitesOverview: null,
    pagination: new Pagination(),
    areSitesLoading: false,
    isSiteLoading: false,
    isSitesOverviewLoading: false,
  },
});

const site = selector({
  key: 'site',
  get: ({ get }) => get(siteAtom).site,
});

const sitesWithoutActiveSite = selector({
  key: 'sitesWithoutActiveSite',
  get: ({ get }) => {
    const { sites } = get(siteAtom);
    const { user } = get(auth.state.authAtom);

    if (!user?.activeSite) {
      return sites;
    }

    return sites.filter((site) => site.id !== user?.activeSite?.id);
  },
});

export default { siteAtom, site, sitesWithoutActiveSite };
