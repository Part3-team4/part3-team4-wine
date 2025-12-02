'use client';

import BannerWineCard from '@/components/features/WineCard/BannerWineCard';
import styles from './page.module.scss';
import WineReviewDetail from '@/components/features/WineReviewCard/WineReviewDetail';
import Button from '@/components/common/Button/Button';
import StarRating from '@/components/common/StarRating/StarRating';
import RatingDistributionBar from '@/components/features/RatingDistributionBar/RatingDistributionBar';
import { api } from '@/libs/api';
import { use, useEffect, useMemo, useState } from 'react';
import NoResult from '@/components/common/NoResult/NoResult';

export interface WineReview {
  id: number;

  user: {
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
}

const ratingData = [
  { score: 5, value: 80 },
  { score: 4, value: 70 },
  { score: 3, value: 25 },
  { score: 2, value: 10 },
  { score: 1, value: 2 },
];

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function Page({ params }: PageProps) {
  const { id } = use(params);
  const wineId = Number(id);

  const [wine, setWine] = useState<any>(null);

  useEffect(() => {
    async function fetchWine() {
      const res = await api.get(`/wines/${wineId}`);
      console.log(res.data);
      setWine(res.data);
    }
    fetchWine();
  }, [wineId]);

  const ratingData = useMemo(() => {
    if (!wine?.avgRatings) return [];

    const entries = Object.entries(wine.avgRatings).map(([score, count]) => ({
      score: Number(score),
      count: Number(count),
    }));

    const total = entries.reduce((acc, v) => acc + v.count, 0) || 1; // 0 나눗셈 방지

    return entries
      .map((item) => ({
        score: item.score,
        value: Math.round((item.count / total) * 100), // 퍼센트 변환
      }))
      .sort((a, b) => b.score - a.score); // 5점→1점 순 정렬
  }, [wine]);

  if (!wine) return <div>로딩중...</div>;

  return (
    <div className={styles.wineDetail}>
      <BannerWineCard name={wine.name} region={wine.region} price={wine.price} image={wine.image} />

      <div className={styles.content}>
        <div className={styles.reviewList}>
          <h2>리뷰 목록</h2>
          {wine.reviews.length === 0 ? (
            <NoResult showButton content="작성된 리뷰가 없어요" buttonText="리뷰 남기기" />
          ) : (
            <ul className={styles.list}>
              {wine.reviews.map((review: WineReview) => (
                <li key={review.id}>
                  <WineReviewDetail
                    profile={{
                      name: review.user?.nickname ?? '익명',
                      avatar: review.user?.image ?? undefined,
                    }}
                    createdAt={review.createdAt}
                    rating={review.rating}
                    aromas={review.aroma}
                    description={review.content}
                    flavor={{
                      body: review.lightBold,
                      tannin: review.smoothTannic,
                      sweetness: review.drySweet,
                      acidity: review.softAcidic,
                    }}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>

        {wine.reviews.length > 0 && (
          <div className={styles.reviewScore}>
            <div className={styles.starArea}>
              <strong>{Number(wine.avgRating ?? 0).toFixed(1)}</strong>
              <div>
                <StarRating defaultValue={4} />
                <span>{wine.reviews.length}개 후기</span>
              </div>
            </div>

            <div className={styles.ratingArea}>
              <RatingDistributionBar data={ratingData} />
            </div>

            <Button size="xsmall">리뷰 남기기</Button>
          </div>
        )}
      </div>
    </div>
  );
}
