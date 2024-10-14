import { Pagination, Resident, Response } from '@/common/models';

export interface ResidentState extends Response {
  residents: Resident[];
  resident: Resident | null;
  pagination: Pagination;
  isResidentLoading: boolean;
  areResidentsLoading: boolean;
}
