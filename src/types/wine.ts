export type Wine = {
  id: number;
  name: string;
  rating: number;
  region: string;
  price: number;
  image?: string;
  reviewLength: number;
  reviewContent: string;
  userId: number;
};

export type Review = {
  id: number;
  user: {
    id: number;
    nickname: string;
    image?: string | null;
  };
  createdAt: string;
  rating: number;
  aroma: string[];
  content: string;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  wineId: number;
  wine: {
    id: number;
    name: string;
  };
};

export type User = {
  id: number;
  nickname: string;
  image?: string;
};
