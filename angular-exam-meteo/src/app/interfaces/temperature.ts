import { WorldCity } from './worldCity';

export interface Temperature {
  id?: number;
  timestamp?: number;
  value: number;
  icon?: string;
  worldCity: WorldCity;
}
