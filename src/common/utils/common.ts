import { padEnd as _padEnd, padStart as _padStart } from 'lodash';

import { Day, Site, User } from '../models';

const ordinalSuffixOf = (number: number) => {
  const j = number % 10;
  const k = number % 100;
  if (j === 1 && k !== 11) {
    return `${number}st`;
  }
  if (j === 2 && k !== 12) {
    return `${number}nd`;
  }
  if (j === 3 && k !== 13) {
    return `${number}rd`;
  }
  return `${number}th`;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const getFormattedTime = (time: string): string =>
  _padStart(_padEnd(time, parseInt(time, 10) > 9 ? 5 : 4, ':00'), 5, '0');

const getFormattedDay = (day: Day): string => {
  switch (day) {
    case Day.MONDAY:
      return 'page.accessLevels.timeSchedule.monday';
    case Day.TUESDAY:
      return 'page.accessLevels.timeSchedule.tuesday';
    case Day.WEDNESDAY:
      return 'page.accessLevels.timeSchedule.wednesday';
    case Day.THURSDAY:
      return 'page.accessLevels.timeSchedule.thursday';
    case Day.FRIDAY:
      return 'page.accessLevels.timeSchedule.friday';
    case Day.SATURDAY:
      return 'page.accessLevels.timeSchedule.saturday';
    case Day.SUNDAY:
      return 'page.accessLevels.timeSchedule.sunday';
    default:
      return day;
  }
};

const getUserFullName = (user: User | null) => {
  if (!user) {
    return '-';
  }

  return user.companyId || user.apartmentId || user.firstName
    ? `${user.firstName} ${user.lastName}`
    : user.name;
};

const getFormattedAddress = (site: Site | null) => {
  if (!site) {
    return '-';
  }

  return site.address
    ? `${site.address.street}, ${site.address.postalCode} ${site.address.city}${
        site.address.country ? `, ${site.address.country?.name}` : ''
      }`
    : '-';
};

export default {
  getFormattedAddress,
  getFormattedDay,
  getFormattedTime,
  getUserFullName,
  ordinalSuffixOf,
  sleep,
};
