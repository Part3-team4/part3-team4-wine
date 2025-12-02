import type { WineListParams } from '../types/wine.types';

/**
 * Wines Query Key Factory
 */
export const winesQueryKeys = {
  all: ['wines'] as const,
  list: (params: WineListParams) => [...winesQueryKeys.all, 'list', params] as const,
};
