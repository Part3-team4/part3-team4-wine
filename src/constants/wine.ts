export const WINE_TYPES = {
  RED: 'RED',
  WHITE: 'WHITE',
  SPARKLING: 'SPARKLING',
} as const;

export type WineType = (typeof WINE_TYPES)[keyof typeof WINE_TYPES];

// UI 컴포넌트에서 바로 사용 가능
export const WINE_TYPE_OPTIONS = Object.entries(WINE_TYPES).map(([value, label]) => ({
  value: value as WineType,
  label,
}));
