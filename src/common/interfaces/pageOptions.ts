interface OrderBy {
  [key: string]: string;
}
export interface PageOptions {
  page: number;
  pageSize: number;
  orderBy?: OrderBy[];
}
