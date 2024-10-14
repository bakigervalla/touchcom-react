import { Pagination, Response, Version } from '@/common/models';

export interface VersionState extends Response {
  versions: Version[];
  pagination: Pagination;
  areVersionsLoading: boolean;
}
