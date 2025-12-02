import { winesApi } from '../api/winesApi';
import { winesQueryKeys } from './winesQueryKeys';
import type { WineListParams } from '../types/wine.types';

/**
 * Wines Query Options Factory
 */
export const winesQueries = {
  list: (params: WineListParams) => ({
    queryKey: winesQueryKeys.list(params),
    queryFn: () => winesApi.getWines(params),
  }),
};
