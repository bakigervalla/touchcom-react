export default {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 8,
  PAGE_SIZES: [4, 8, 16],
  DEVICES: {
    PAGE_SIZE: 8,
    USERS: {
      PAGE_SIZE: 3,
    },
    USERS_NOT_CONNECTED_TO_DEVICE: {
      PAGE_SIZE: 5,
    },
  },
  ACCESS_KEYS: {
    PAGE_SIZE: 9,
    USERS: {
      PAGE_SIZE: 5,
    },
    DEVICES: {
      PAGE_SIZE: 5,
    },
  },
  ACCESS_LEVELS: {
    PAGE_SIZE: 10,
    DEVICES: {
      PAGE_SIZE: 5,
    },
    USERS: {
      PAGE_SIZE: 5,
    },
    EXCEPTIONS: {
      PAGE_SIZE: 6,
    },
    DEVICES_NOT_CONNECTED_TO_ACCESS_LEVEL: {
      PAGE_SIZE: 5,
    },
    USERS_NOT_CONNECTED_TO_ACCESS_LEVEL: {
      PAGE_SIZE: 5,
    },
  },
  SITES: {
    PAGE_SIZE: 8,
  },
  ROLES: {
    PAGE_SIZE: 10,
  },
  PERMISSIONS: {
    PAGE_SIZE: 100,
  },
  USERS: {
    PAGE_SIZE: 7,
    ACCESS_KEYS: {
      PAGE_SIZE: 3,
    },
    ACCESS_KEYS_NOT_CONNECTED_TO_USER: {
      PAGE_SIZE: 5,
    },
    DEVICES: {
      PAGE_SIZE: 2,
    },
    DEVICES_NOT_CONNECTED_TO_USER: {
      PAGE_SIZE: 5,
    },
    RESIDENTS: {
      PAGE_SIZE: 2,
    },
    RESIDENTS_NOT_CONNECTED_TO_COMPANY_OR_APARTMENT: {
      PAGE_SIZE: 5,
    },
  },
  ADMINS: {
    PAGE_SIZE: 8,
  },
};
