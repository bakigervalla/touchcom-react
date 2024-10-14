import { Response, Statistics } from '@/common/models';

export interface StatisticsState extends Response {
  statistics: Statistics;
  areStatisticsLoading: boolean;
}
