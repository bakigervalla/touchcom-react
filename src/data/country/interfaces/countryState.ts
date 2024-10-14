import { Country, Pagination, Response } from '@/common/models';

export interface CountryState extends Response {
  countries: Country[];
  pagination: Pagination;
  areCountriesLoading: boolean;
}
