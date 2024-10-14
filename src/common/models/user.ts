import { Address } from './address';
import { Country } from './country';
import { Pagination } from './pagination';
import { Role } from './role';
import { Site } from './site';

export enum UserStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  BLOCKED = 'BLOCKED',
}

export enum UserType {
  RESIDENT = 'RESIDENT',
  APARTMENT = 'APARTMENT',
  COMPANY = 'COMPANY',
}

interface Jwt {
  iat: number;
  exp: number;
}

export interface Token {
  accessToken: string;
  refreshToken: string;
}

export interface User extends Jwt {
  id: number;
  email: string;
  password?: string;
  confirmPassword?: string;
  name?: string;
  firstName: string;
  lastName: string;
  imageUrl?: string;
  address: Address;
  floor: number;
  accessControls: any[];
  phone: string;
  activeSite?: (Site & { address: Address & { country: Country } }) | null;
  role: Role;
  roleId: number;
  status: UserStatus;
  type: UserType;
  companyId?: number | null;
  apartmentId?: number | null;
  verificationCodeExpiration: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Company extends Omit<User, 'iat' | 'exp'> {
  name?: string;
  floor: number;
}

export interface Apartment extends Omit<User, 'iat' | 'exp'> {
  name?: string;
  floor: number;
  number: number;
}

export interface Resident extends Omit<User, 'iat' | 'exp'> {
  company?: Company;
  companyId?: number | null;
  apartment?: Apartment;
  apartmentId?: number | null;
}

export class PaginatedCompany extends Pagination {
  data!: Company[];
}

export class PaginatedApartment extends Pagination {
  data!: Apartment[];
}

export class PaginatedResident extends Pagination {
  data!: Resident[];
}

export class PaginatedUser extends Pagination {
  data!: User[];
}

export class PaginatedUserDevices extends Pagination {
  data!: (any & { isVisible: boolean; site: Site })[];
}

export interface ResendUserInvitation {
  email: string;
}

export interface InviteUser {
  firstName: string;
  lastName: string;
  email: string;
  roleId?: number;
}

export interface AcceptInviteRequest {
  invitationToken: string;
  password: string;
}

export interface UserAccessControl {
  device: any;
  accessKey: any;
  accessGroup: any;
}

export interface CreateUser extends Partial<User> {
  number: string;
  confirmPassword: string;
  accessControl?: Partial<UserAccessControl>;
}
