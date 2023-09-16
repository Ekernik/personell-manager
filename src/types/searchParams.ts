import { ViewFilterOptions } from './context';

export interface SearchParams extends URLSearchParams {
  date?: string;
  filter?: ViewFilterOptions;
}
