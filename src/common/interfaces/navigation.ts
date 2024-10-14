import { TablerIconsProps } from '@tabler/icons-react';
import { ComponentType } from 'react';

export interface NavigationItem {
  icon: ComponentType<TablerIconsProps>;
  route: string;
  title: string;
  roles: string[];
  subItems: Omit<NavigationItem, 'subItems'>[];
}
