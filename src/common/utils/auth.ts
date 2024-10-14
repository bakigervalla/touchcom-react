import { User } from '@/common/models';

const isInRole = (user: User, role: string) => user.role.name === role;

const hasOneRole = (user: User, roles: string[] = []) => {
  if (roles.length <= 0) return true;
  return roles.some((role: string) => isInRole(user, role));
};

export default {
  hasOneRole,
  isInRole,
};
