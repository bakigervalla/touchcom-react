import { uniqBy as _uniqBy } from 'lodash';
import { useRecoilCallback } from 'recoil';

import { BackendError } from '@/common/errors';
import { KeyPair, PageOptions, SiteFilter } from '@/common/interfaces';
import { PaginatedSite, Site, SitesOverview, User } from '@/common/models';

import app from '../app';
import auth from '../auth';

import useSiteServices from './services';
import state from './state';

const useSiteActions = () => {
  const service = useSiteServices();
  const { showErrorMessage, showSuccessMessage } = app.actions();

  const getSitesOverview = useRecoilCallback(
    ({ set }) =>
      () => {
        set(state.siteAtom, (prev) => ({
          ...prev,
          isSitesOverviewLoading: true,
        }));
        service
          .getSitesOverview()
          .then((response: SitesOverview) => {
            set(state.siteAtom, (prev) => ({
              ...prev,
              sitesOverview: response,
              isSitesOverviewLoading: false,
            }));
          })
          .catch((error: BackendError) => {
            set(state.siteAtom, (prev) => ({
              ...prev,
              isSitesOverviewLoading: false,
            }));
            showErrorMessage(error.message);
          });
      },
    [],
  );

  const getSites = useRecoilCallback(
    ({ set }) =>
      (pageOptions?: PageOptions, filters?: SiteFilter) => {
        set(state.siteAtom, (prev) => ({
          ...prev,
          areSitesLoading: true,
        }));
        service
          .getSites(pageOptions, filters)
          .then((response: PaginatedSite) => {
            const { data, ...pagination } = response;
            set(state.siteAtom, (prev) => ({
              ...prev,
              sites: _uniqBy(
                [...prev.sites, ...data].filter((site: Site & KeyPair<any>) =>
                  Object.keys(filters || {}).length > 0
                    ? Object.keys(filters || {}).some(
                        (filter) =>
                          site[filter] ===
                          (filters as SiteFilter & KeyPair<any>)[filter],
                      )
                    : true,
                ),
                'id',
              ),
              pagination,
              areSitesLoading: false,
            }));
          })
          .catch((error: BackendError) => {
            set(state.siteAtom, (prev) => ({
              ...prev,
              areSitesLoading: false,
            }));
            showErrorMessage(error.message);
          });
      },
    [],
  );

  const getSite = useRecoilCallback(
    ({ set }) =>
      (id: string) => {
        set(state.siteAtom, (prev) => ({
          ...prev,
          isSiteLoading: true,
        }));
        service
          .getSite(id)
          .then((response: Site) => {
            set(state.siteAtom, (prev) => ({
              ...prev,
              site: response,
              isSiteLoading: false,
            }));
          })
          .catch((error: BackendError) => {
            showErrorMessage(error.message);
            set(state.siteAtom, (prev) => ({
              ...prev,
              isSiteLoading: true,
            }));
          });
      },
    [],
  );

  const saveSite = useRecoilCallback(
    ({ set }) =>
      (data: Site) => {
        service
          .createOrUpdateSite(data)
          .then((response: Site) => {
            set(auth.state.authAtom, (prev) => ({
              ...prev,
              user: {
                ...prev.user,
                activeSite:
                  prev.user?.activeSite &&
                  prev.user?.activeSite.id === response.id
                    ? { ...prev.user?.activeSite, ...response }
                    : null,
              } as User,
            }));
            set(state.siteAtom, (prev) => ({
              ...prev,
              sites: prev.sites.some((site) => site.id === response.id)
                ? prev.sites.map((site) => {
                    if (site.id === response.id) {
                      return response;
                    }
                    return site;
                  })
                : [...prev.sites, response],
              site: response,
            }));
          })
          .catch((error: BackendError) => showErrorMessage(error.message));
      },
    [],
  );

  const removeSite = useRecoilCallback(
    ({ set }) =>
      (site: Site) => {
        service
          .removeSite(site.id)
          .then(() => {
            set(state.siteAtom, (prev) => ({
              ...prev,
              sites: prev.sites.filter((oldSite) => oldSite.id !== site.id),
            }));
            showSuccessMessage(`Site (${site.name}) removed successfully`);
          })
          .catch((error: BackendError) => showErrorMessage(error.message));
      },
    [],
  );

  const changeImage = useRecoilCallback(
    ({ set }) =>
      (image: File, siteId: number) => {
        service
          .changeImage(image, siteId)
          .then((response: Site) => {
            set(state.siteAtom, (prev) => ({
              ...prev,
              site: { ...prev.site, ...response },
              sites: prev.sites.map((site) =>
                site.id === siteId ? { ...site, ...response } : site,
              ),
            }));
          })
          .catch((error: BackendError) => {
            showErrorMessage(error.message);
          });
      },
    [],
  );

  return {
    changeImage,
    getSite,
    getSites,
    getSitesOverview,
    removeSite,
    saveSite,
  };
};

export default useSiteActions;
