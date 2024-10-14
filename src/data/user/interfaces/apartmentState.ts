import { Apartment, Pagination, Response } from '@/common/models';

export interface ApartmentState extends Response {
  apartments: Apartment[];
  apartment: Apartment | null;
  pagination: Pagination;
  isApartmentLoading: boolean;
  areApartmentsLoading: boolean;
}
