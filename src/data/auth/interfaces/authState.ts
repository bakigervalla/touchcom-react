import { User } from '@/common/models';

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
}
