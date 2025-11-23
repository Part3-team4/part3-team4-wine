// 향 상수 값
export const AROMA_EN = {
  CHERRY: 'CHERRY',
  BERRY: 'BERRY',
  OAK: 'OAK',
  VANILLA: 'VANILLA',
  PEPPER: 'PEPPER',
  BAKING: 'BAKING',
  GRASS: 'GRASS',
  APPLE: 'APPLE',
  PEACH: 'PEACH',
  CITRUS: 'CITRUS',
  TROPICAL: 'TROPICAL',
  MINERAL: 'MINERAL',
  FLOWER: 'FLOWER',
  TOBACCO: 'TOBACCO',
  EARTH: 'EARTH',
  CHOCOLATE: 'CHOCOLATE',
  SPICE: 'SPICE',
  CARAMEL: 'CARAMEL',
  LEATHER: 'LEATHER',
} as const;

export type AromaType = (typeof AROMA_EN)[keyof typeof AROMA_EN];

// 향 (한글 변환) 상수 값
export const AROMA_KO: Record<AromaType, string> = {
  CHERRY: '체리',
  BERRY: '베리',
  OAK: '오크',
  VANILLA: '바닐라',
  PEPPER: '후추',
  BAKING: '제빵',
  GRASS: '풀',
  APPLE: '사과',
  PEACH: '복숭아',
  CITRUS: '시트러스',
  TROPICAL: '트로피컬',
  MINERAL: '미네랄',
  FLOWER: '꽃',
  TOBACCO: '담뱃잎',
  EARTH: '흙',
  CHOCOLATE: '초콜릿',
  SPICE: '스파이스',
  CARAMEL: '카라멜',
  LEATHER: '가죽',
};

// 리뷰 등록 모달 Chip 에서 사용할 수 있음
export const AROMA_OPTIONS = Object.entries(AROMA_KO).map(([value, label]) => ({
  value: value as AromaType,
  label,
}));
