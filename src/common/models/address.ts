import { Country } from './country';

export interface Address {
  id: number;
  street: string;
  number: string;
  city: string;
  postalCode: string;
  countryId: number;
  country?: Country;
  createdAt: Date;
  updatedAt: Date;
}
