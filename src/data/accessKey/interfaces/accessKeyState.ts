import { AccessKey, AccessKeysOverview, Pagination } from '@/common/models';

export interface AccessKeyState {
  accessKeys: AccessKey[];
  accessKey: AccessKey | null;
  userAccessKeys: AccessKey[];
  accessKeysNotConnectedToUser: AccessKey[];
  accessKeysOverview: AccessKeysOverview | null;
  pagination: Pagination;
  userAccessKeysPagination: Pagination;
  accessKeysNotConnectedToUserPagination: Pagination;
  isAccessKeyLoading: boolean;
  areAccessKeysLoading: boolean;
  areUserAccessKeysLoading: boolean;
  isAccessKeysOverviewLoading: boolean;
  isAccessKeyTimeScheduleLoading: boolean;
  areAccessKeysNotConnectedToUserLoading: boolean;
}
