import { ReactNode } from 'react';

export interface DynamicDataContainerColumn<T> {
  key: string;
  label?: string;
  render?: (data: T) => ReactNode;
}
