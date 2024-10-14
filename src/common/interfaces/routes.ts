import { ComponentType } from 'react';

export interface Route {
  name: string;
  path: string;
  component: ComponentType<any>;
  hideMenu?: boolean;
  isProtected: boolean;
  roles?: string[];
}
