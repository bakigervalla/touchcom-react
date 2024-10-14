import { Pagination, Response, Site, SitesOverview } from '@/common/models';

export interface SiteState extends Response {
  sites: Site[];
  site: Site | null;
  sitesOverview: SitesOverview | null;
  pagination: Pagination;
  areSitesLoading: boolean;
  isSiteLoading: boolean;
  isSitesOverviewLoading: boolean;
}
