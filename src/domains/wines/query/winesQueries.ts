import { queryOptions } from '@tanstack/react-query';
import { winesApi } from '../api/winesApi';
import { winesQueryKeys } from './winesQueryKeys';
import type { WineListParams } from '../types/wine.types';

/**
 * Wines Query Options Factory
 */
export const winesQueries = {
  list: (params: WineListParams) =>
    queryOptions({
      queryKey: winesQueryKeys.list(params),
      queryFn: () => winesApi.getWines(params),
      staleTime: 0,
    }),
};
