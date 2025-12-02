// src/domains/wines/hooks/useWines.ts
'use client';

import { useQuery } from '@tanstack/react-query';
import { winesQueries } from '../query/winesQueries';
import type { WineListParams } from '../types/wine.types';

/**
 * 와인 목록 조회 훅
 */
export function useWines(params: WineListParams = { limit: 20 }) {
  return useQuery(winesQueries.list(params));
}
