// src/domains/wines/types/wine.types.ts

/**
 * Wine Entity
 */
export type Wine = {
  id: number;
  name: string;
  rating: number;
  region: string;
  price: number;
  image?: string;
  reviewLength: number;
  reviewContent: string;
};

/**
 * Wine List Response
 */
export type WineListResponse = {
  list: Wine[];
  totalCount: number;
  nextCursor?: number;
};

/**
 * Wine 정렬 옵션
 */
export const WINE_SORT_OPTIONS = [
  { value: 'reviewCount', label: '많은 리뷰' },
  { value: 'price', label: '높은가격순' },
  { value: '-price', label: '낮은 가격순' },
  { value: 'recent', label: '추천순' },
] as const;

export type WineSortValue = (typeof WINE_SORT_OPTIONS)[number]['value'];

/**
 * Wine List Query Params
 */
export type WineListParams = {
  limit?: number;
  cursor?: number;
  keyword?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  order?: WineSortValue;
};
