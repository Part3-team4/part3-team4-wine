// src/domains/wines/api/winesApi.ts
import { api } from '@/libs/api';
import type { WineListResponse, WineListParams } from '../types/wine.types';

/**
 * Wines API
 */
export const winesApi = {
  /**
   * 와인 목록 조회
   */
  getWines: async (params?: WineListParams): Promise<WineListResponse> => {
    const res = await api.get<WineListResponse>('/wines', { params });
    return res.data;
  },
};
