import { Company, Pagination, Response } from '@/common/models';

export interface CompanyState extends Response {
  companies: Company[];
  company: Company | null;
  pagination: Pagination;
  isCompanyLoading: boolean;
  areCompaniesLoading: boolean;
}
