import { Pagination } from './pagination';

export interface Version {
  id: number;
  tag: string;
  fileUrl: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export class PaginatedVersion extends Pagination {
  data!: Version[];
}
