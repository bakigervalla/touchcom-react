import { atom } from 'recoil';

import { Pagination } from '@/common/models';

import {
  ApartmentState,
  CompanyState,
  ResidentState,
  UserState,
} from './interfaces';

const userAtom = atom<UserState>({
  key: 'users',
  default: {
    users: [],
    user: null,
    userDevices: [],
    userResidents: [],
    usersNotConnectedToDevice: [],
    residentsNotConnectedToUser: [],
    pagination: new Pagination(),
    userDevicesPagination: new Pagination(),
    userResidentsPagination: new Pagination(),
    usersNotConnectedToDevicePagination: new Pagination(),
    residentsNotConnectedToUserPagination: new Pagination(),
    isUserLoading: false,
    areUsersLoading: false,
    areUserDevicesLoading: false,
    areUserResidentsLoading: false,
    areUsersNotConnectedToDeviceLoading: false,
    areResidentsNotConnectedToUserLoading: false,
  },
});

const companyAtom = atom<CompanyState>({
  key: 'companies',
  default: {
    companies: [],
    company: null,
    pagination: new Pagination(),
    isCompanyLoading: false,
    areCompaniesLoading: false,
  },
});

const apartmentAtom = atom<ApartmentState>({
  key: 'apartments',
  default: {
    apartments: [],
    apartment: null,
    pagination: new Pagination(),
    isApartmentLoading: false,
    areApartmentsLoading: false,
  },
});

const residentAtom = atom<ResidentState>({
  key: 'residents',
  default: {
    residents: [],
    resident: null,
    pagination: new Pagination(),
    isResidentLoading: false,
    areResidentsLoading: false,
  },
});

export default {
  apartmentAtom,
  companyAtom,
  residentAtom,
  userAtom,
};
