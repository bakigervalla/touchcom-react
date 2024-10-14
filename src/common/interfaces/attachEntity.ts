import { ComponentType } from 'react';

export interface NotFoundData {
  label: string;
  description: string;
  icon: ComponentType<any>;
}

export interface HistoryItem {
  id: number;
  title: string;
  imageUrl: string;
  subtitle?: string;
}

export interface EntityInfoData {
  id: number;
  imageUrl: string;
  title: string;
  subtitle?: string;
}
