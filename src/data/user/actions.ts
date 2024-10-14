import jwtDecode from 'jwt-decode';
import { useRecoilCallback, useSetRecoilState } from 'recoil';

import { BackendError } from '@/common/errors';
import { DeviceFilter, PageOptions, UserFilter } from '@/common/interfaces';
import {
  AcceptInviteRequest,
  Apartment,
  Company,
  CreateUser,
  InviteUser,
  PaginatedApartment,
  PaginatedCompany,
  PaginatedResident,
  PaginatedUser,
  PaginatedUserDevices,
  ResendUserInvitation,
  Resident,
  Token,
  User,
  UserType,
} from '@/common/models';

import app from '../app';
import auth from '../auth';

import useUserServices from './services';
import state from './state';

const useUserActions = () => {
  const service = useUserServices();
  const setAuth = useSetRecoilState(auth.state.authAtom);
  const { showErrorMessage, showSuccessMessage } = app.actions();

  const getCompany = useRecoilCallback(
    ({ set }) =>
      (id: string) => {
        set(state.companyAtom, (prev) => ({
          ...prev,
          isCompanyLoading: true,
        }));
        service
          .getUser(id)
          .then((response: Company) => {
            set(state.companyAtom, (prev) => ({
              ...prev,
              company: response,
              isCompanyLoading: false,
            }));
          })
          .catch((error: BackendError) => {
            showErrorMessage(error.message);
            set(state.companyAtom, (prev) => ({
              ...prev,
              isCompanyLoading: false,
            }));
          });
      },
    [],
  );

  const createUser = useRecoilCallback(
    ({ set }) =>
      (data: CreateUser) => {
        service
          .createOrUpdateUser(data)
          .then((response: User & Apartment & Company) => {
            set(state.residentAtom, (prev) => ({
              ...prev,
              resident: response,
              residents: [...prev.residents, response],
            }));
            set(state.companyAtom, (prev) => ({
              ...prev,
              company: response,
              companies: [...prev.companies, response],
            }));
            set(state.apartmentAtom, (prev) => ({
              ...prev,
              apartment: response as Apartment,
              apartments: [...prev.apartments, response],
            }));
            set(state.userAtom, (prev) => ({
              ...prev,
              user: response,
              users: [...prev.users, response],
            }));

            if (data.type === UserType.RESIDENT) {
              showSuccessMessage(
                `${data?.firstName ?? '-'} created successfully`,
              );
            } else {
              showSuccessMessage(`${data?.name ?? '-'} created successfully`);
            }
          })
          .catch((error: BackendError) => showErrorMessage(error.message));
      },
    [],
  );

  const createCompany = useRecoilCallback(
    ({ set }) =>
      (data: Omit<Company, 'id' | 'createdAt' | 'updatedAt'>) => {
        service
          .createOrUpdateUser(data)
          .then((response: Company) => {
            set(state.companyAtom, (prev) => ({
              ...prev,
              company: response,
            }));
          })
          .catch((error: BackendError) => showErrorMessage(error.message));
      },
    [],
  );

  const updateCompany = useRecoilCallback(
    ({ set }) =>
      (data: Company) => {
        service
          .createOrUpdateUser(data)
          .then((response: Company) => {
            set(state.companyAtom, (prev) => ({
              ...prev,
              company: response,
            }));
          })
          .catch((error: BackendError) => showErrorMessage(error.message));
      },
    [],
  );

  const getApartment = useRecoilCallback(
    ({ set }) =>
      (id: string) => {
        set(state.apartmentAtom, (prev) => ({
          ...prev,
          isApartmentLoading: true,
        }));
        service
          .getUser(id)
          .then((response: Apartment) => {
            set(state.apartmentAtom, (prev) => ({
              ...prev,
              apartment: response,
              isApartmentLoading: false,
            }));
          })
          .catch((error: BackendError) => {
            showErrorMessage(error.message);
            set(state.apartmentAtom, (prev) => ({
              ...prev,
              isApartmentLoading: false,
            }));
          });
      },
    [],
  );

  const createApartment = useRecoilCallback(
    ({ set }) =>
      (data: Omit<Apartment, 'id' | 'createdAt' | 'updatedAt'>) => {
        service
          .createOrUpdateUser(data)
          .then((response: Apartment) => {
            set(state.apartmentAtom, (prev) => ({
              ...prev,
              apartment: response,
            }));
          })
          .catch((error: BackendError) => showErrorMessage(error.message));
      },
    [],
  );

  const updateApartment = useRecoilCallback(
    ({ set }) =>
      (data: Partial<Apartment>) => {
        service
          .createOrUpdateUser(data)
          .then((response: Apartment) => {
            set(state.apartmentAtom, (prev) => ({
              ...prev,
              apartment: response,
            }));
          })
          .catch((error: BackendError) => showErrorMessage(error.message));
      },
    [],
  );

  const updateUser = useRecoilCallback(
    ({ set }) =>
      (data: Partial<User>) => {
        service
          .createOrUpdateUser(data)
          .then((response: User & Apartment) => {
            set(state.residentAtom, (prev) => ({
              ...prev,
              resident: { ...prev, ...response },
              residents: prev.residents.map((resident) =>
                resident.id === response.id
                  ? { ...resident, ...response }
                  : resident,
              ),
            }));
            set(state.companyAtom, (prev) => ({
              ...prev,
              company: { ...prev, ...response },
              companies: prev.companies.map((company) =>
                company.id === response.id
                  ? { ...company, ...response }
                  : company,
              ),
            }));
            set(state.apartmentAtom, (prev) => ({
              ...prev,
              apartment: { ...prev, ...response },
              apartments: prev.apartments.map((apartment) =>
                apartment.id === response.id
                  ? { ...apartment, ...response }
                  : apartment,
              ),
            }));
            set(state.userAtom, (prev) => ({
              ...prev,
              user: { ...prev, ...response },
              users: prev.users.map((user) =>
                user.id === response.id ? { ...user, ...response } : user,
              ),
            }));
            set(auth.state.authAtom, (prev) => ({
              ...prev,
              user:
                prev.user && prev.user.id === response.id
                  ? {
                      ...prev.user,
                      name: response.name,
                      firstName: response.firstName,
                      lastName: response.lastName,
                      email: response.email,
                      phone: response.phone,
                      role: response.role,
                    }
                  : prev.user,
            }));
          })
          .catch((error: BackendError) => showErrorMessage(error.message));
      },
    [],
  );

  const getApartments = useRecoilCallback(
    ({ set }) =>
      (pageOptions?: PageOptions, filters?: UserFilter) => {
        set(state.apartmentAtom, (prev) => ({
          ...prev,
          areApartmentsLoading: true,
        }));
        service
          .getUsers(pageOptions, filters)
          .then((response: PaginatedApartment) => {
            const { data, ...pagination } = response;
            set(state.apartmentAtom, (prev) => ({
              ...prev,
              pagination,
              apartments: data,
              areApartmentsLoading: false,
            }));
          })
          .catch((error: BackendError) => {
            set(state.apartmentAtom, (prev) => ({
              ...prev,
              areApartmentsLoading: false,
            }));
            showErrorMessage(error.message);
          });
      },
    [],
  );

  const getResidents = useRecoilCallback(
    ({ set }) =>
      (pageOptions?: PageOptions, filters?: UserFilter) => {
        set(state.residentAtom, (prev) => ({
          ...prev,
          areResidentsLoading: true,
        }));
        service
          .getUsers(pageOptions, filters)
          .then((response: PaginatedResident) => {
            const { data, ...pagination } = response;
            set(state.residentAtom, (prev) => ({
              ...prev,
              pagination,
              residents: data,
              areResidentsLoading: false,
            }));
          })
          .catch((error: BackendError) => {
            set(state.residentAtom, (prev) => ({
              ...prev,
              areResidentsLoading: false,
            }));
            showErrorMessage(error.message);
          });
      },
    [],
  );

  const getCompanies = useRecoilCallback(
    ({ set }) =>
      (pageOptions?: PageOptions, filters?: UserFilter) => {
        set(state.companyAtom, (prev) => ({
          ...prev,
          areCompaniesLoading: true,
        }));
        service
          .getUsers(pageOptions, filters)
          .then((response: PaginatedCompany) => {
            const { data, ...pagination } = response;
            set(state.companyAtom, (prev) => ({
              ...prev,
              pagination,
              companies: data,
              areCompaniesLoading: false,
            }));
          })
          .catch((error: BackendError) => {
            set(state.companyAtom, (prev) => ({
              ...prev,
              areCompaniesLoading: false,
            }));
            showErrorMessage(error.message);
          });
      },
    [],
  );

  const getAdmins = useRecoilCallback(
    ({ set }) =>
      (pageOptions?: PageOptions, filters?: UserFilter) => {
        set(state.userAtom, (prev) => ({
          ...prev,
          areUsersLoading: true,
        }));
        service
          .getAdmins(pageOptions, filters)
          .then((response: PaginatedUser) => {
            const { data, ...pagination } = response;
            set(state.userAtom, (prev) => ({
              ...prev,
              pagination,
              users: data,
              areUsersLoading: false,
            }));
          })
          .catch((error: BackendError) => {
            set(state.userAtom, (prev) => ({
              ...prev,
              areUsersLoading: false,
            }));
            showErrorMessage(error.message);
          });
      },
    [],
  );

  const getUsers = useRecoilCallback(
    () => (pageOptions?: PageOptions, filters?: UserFilter) => {
      switch (filters?.type) {
        case UserType.RESIDENT:
          getResidents(pageOptions, filters);
          break;
        case UserType.COMPANY:
          getCompanies(pageOptions, filters);
          break;
        case UserType.APARTMENT:
          getApartments(pageOptions, filters);
          break;
        default:
          getResidents(pageOptions, filters);
          break;
      }
    },
    [],
  );

  const getResident = useRecoilCallback(
    ({ set }) =>
      (id: string) => {
        set(state.residentAtom, (prev) => ({
          ...prev,
          isResidentLoading: true,
        }));
        service
          .getUser(id)
          .then((response: Resident) => {
            set(state.residentAtom, (prev) => ({
              ...prev,
              resident: response,
              isResidentLoading: false,
            }));
          })
          .catch((error: BackendError) => {
            showErrorMessage(error.message);
            set(state.residentAtom, (prev) => ({
              ...prev,
              isResidentLoading: false,
            }));
          });
      },
    [],
  );

  const createResident = useRecoilCallback(
    ({ set }) =>
      (data: Omit<Resident, 'id' | 'createdAt' | 'updatedAt'>) => {
        service
          .createOrUpdateUser(data)
          .then((response: Resident) => {
            set(state.residentAtom, (prev) => ({
              ...prev,
              resident: response,
            }));
          })
          .catch((error: BackendError) => showErrorMessage(error.message));
      },
    [],
  );

  const updateResident = useRecoilCallback(
    ({ set }) =>
      (data: Resident) => {
        service
          .createOrUpdateUser(data)
          .then((response: Resident) => {
            set(state.residentAtom, (prev) => ({
              ...prev,
              resident: response,
            }));
          })
          .catch((error: BackendError) => showErrorMessage(error.message));
      },
    [],
  );

  const resendUserInvitation = useRecoilCallback(
    ({ set }) =>
      (data: ResendUserInvitation) => {
        service
          .resendUserInvitation(data)
          .then((response: User) => {
            set(state.userAtom, (prev) => ({
              ...prev,
              users: prev.users.map((user) =>
                user.id === response.id ? { ...user, ...response } : user,
              ),
            }));
            showSuccessMessage(
              `Invitation was successfully re-sent to ${response.firstName} ${response.lastName}.`,
            );
          })
          .catch((error: BackendError) => showErrorMessage(error.message));
      },
    [],
  );

  const inviteUser = useRecoilCallback(
    ({ set }) =>
      (data: InviteUser) => {
        service
          .inviteUser(data)
          .then((response: User) => {
            set(state.userAtom, (prev) => ({
              ...prev,
              users: [...prev.users, response],
            }));
            showSuccessMessage(
              `${data.firstName} ${data.lastName} invited successfully.`,
            );
          })
          .catch((error: BackendError) => showErrorMessage(error.message));
      },
    [],
  );

  const acceptUserInvitation = (data: AcceptInviteRequest) => {
    service
      .acceptUserInvitation(data)
      .then((response: Token) => {
        const { accessToken, refreshToken } = response;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        const user: User = jwtDecode(accessToken);
        setAuth((prev) => ({ ...prev, user, accessToken, refreshToken }));
        showSuccessMessage('Invitation accepted successfully.');
      })
      .catch((error: BackendError) => showErrorMessage(error.message));
  };

  const getUserDevices = useRecoilCallback(
    ({ set }) =>
      (userId: number, pageOptions?: PageOptions, filters?: DeviceFilter) => {
        set(state.userAtom, (prev) => ({
          ...prev,
          areUserDevicesLoading: true,
        }));
        service
          .getUserDevices(userId, pageOptions, filters)
          .then((response: PaginatedUserDevices) => {
            const { data, ...pagination } = response;
            set(state.userAtom, (prev) => ({
              ...prev,
              userDevices: data,
              userDevicesPagination: pagination,
              areUserDevicesLoading: false,
            }));
          })
          .catch((error: BackendError) => {
            set(state.userAtom, (prev) => ({
              ...prev,
              areUserDevicesLoading: false,
            }));
            showErrorMessage(error.message);
          });
      },
    [],
  );

  const getUserResidents = useRecoilCallback(
    ({ set }) =>
      (
        userId: number,
        userType: UserType,
        pageOptions?: PageOptions,
        filters?: UserFilter,
      ) => {
        set(state.userAtom, (prev) => ({
          ...prev,
          areUserResidentsLoading: true,
        }));
        service
          .getUserResidents(userId, userType, pageOptions, filters)
          .then((response: PaginatedUser) => {
            const { data, ...pagination } = response;
            set(state.userAtom, (prev) => ({
              ...prev,
              userResidents: data,
              userResidentsPagination: pagination,
              areUserResidentsLoading: false,
            }));
          })
          .catch((error: BackendError) => {
            set(state.userAtom, (prev) => ({
              ...prev,
              areUserResidentsLoading: false,
            }));
            showErrorMessage(error.message);
          });
      },
    [],
  );

  const getResidentsNotConnectedToUser = useRecoilCallback(
    ({ set }) =>
      (
        userId: number,
        userType: UserType,
        pageOptions?: PageOptions,
        filters?: UserFilter,
      ) => {
        set(state.userAtom, (prev) => ({
          ...prev,
          areResidentsNotConnectedToUserLoading: true,
        }));
        service
          .getResidentsNotConnectedToUser(
            userId,
            userType,
            pageOptions,
            filters,
          )
          .then((response: PaginatedUser) => {
            const { data, ...pagination } = response;
            set(state.userAtom, (prev) => ({
              ...prev,
              residentsNotConnectedToUser: data,
              residentsNotConnectedToUserPagination: pagination,
              areResidentsNotConnectedToUserLoading: false,
            }));
          })
          .catch((error: BackendError) => {
            set(state.userAtom, (prev) => ({
              ...prev,
              areResidentsNotConnectedToUserLoading: false,
            }));
            showErrorMessage(error.message);
          });
      },
    [],
  );

  const getUsersNotConnectedToDevice = useRecoilCallback(
    ({ set }) =>
      (deviceId: number, pageOptions?: PageOptions, filters?: UserFilter) => {
        set(state.userAtom, (prev) => ({
          ...prev,
          areUsersNotConnectedToDeviceLoading: true,
        }));
        service
          .getUsersNotConnectedToDevice(deviceId, pageOptions, filters)
          .then((response: PaginatedUser) => {
            const { data, ...pagination } = response;
            set(state.userAtom, (prev) => ({
              ...prev,
              usersNotConnectedToDevicePagination: pagination,
              usersNotConnectedToDevice: data,
              areUsersNotConnectedToDeviceLoading: false,
            }));
          })
          .catch((error: BackendError) => {
            set(state.userAtom, (prev) => ({
              ...prev,
              areUsersNotConnectedToDeviceLoading: false,
            }));
            showErrorMessage(error.message);
          });
      },
    [],
  );

  const changeImage = useRecoilCallback(
    ({ set }) =>
      (image: File, userId: number) => {
        service
          .changeImage(image, userId)
          .then((response: User) => {
            set(auth.state.authAtom, (prev) => ({
              ...prev,
              user: { ...prev.user, ...response },
            }));
            set(state.userAtom, (prev) => ({
              ...prev,
              user: { ...prev.user, ...response },
            }));
            set(state.residentAtom, (prev) => ({
              ...prev,
              resident: { ...prev.resident, ...response },
            }));
            set(state.companyAtom, (prev) => ({
              ...prev,
              company: { ...prev.company, ...response },
            }));
          })
          .catch((error: BackendError) => {
            showErrorMessage(error.message);
          });
      },
    [],
  );

  return {
    acceptUserInvitation,
    changeImage,
    createApartment,
    createCompany,
    createResident,
    createUser,
    getAdmins,
    getApartment,
    getCompany,
    getResident,
    getResidentsNotConnectedToUser,
    getUserDevices,
    getUserResidents,
    getUsers,
    getUsersNotConnectedToDevice,
    inviteUser,
    resendUserInvitation,
    updateApartment,
    updateCompany,
    updateResident,
    updateUser,
  };
};

export default useUserActions;
