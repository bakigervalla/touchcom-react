import { Address } from './address';
import { Pagination } from './pagination';

export enum SiteStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ERROR = 'ERROR',
}

export interface Site {
  id: number;
  name: string;
  description: string;
  imageUrl?: string;
  floor: number;
  status: SiteStatus;
  addressId: number;
  createdAt: Date;
  updatedAt: Date;
  address: Address;
}

export interface SitesOverview {
  totalSites: number;
  activeSites: number;
  inactiveSites: number;
}

export class PaginatedSite extends Pagination {
  data!: Site[];
}
