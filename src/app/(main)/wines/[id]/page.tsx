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
import { useModal } from '@/hooks/useModal';
import ReviewAddModal from '@/components/features/ModalFeatures/ReviewAddModal/ReviewAddModal';

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

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function Page({ params }: PageProps) {
  const { open, close } = useModal();

  const { id } = use(params);
  const wineId = Number(id);

  const [wine, setWine] = useState<any>(null);

  async function fetchWine() {
    const res = await api.get(`/wines/${wineId}`);
    setWine(res.data);
  }

  useEffect(() => {
    fetchWine();
  }, [wineId]);

  // 리뷰 남기기 패칭
  async function createReview(data: {
    rating: number;
    lightBold: number;
    smoothTannic: number;
    drySweet: number;
    softAcidic: number;
    aroma: string[];
    content: string;
    wineId: number;
  }) {
    const res = await api.post('/reviews', data);
    return res.data;
  }

  // 리뷰 남기기 모달
  const handleOpenReviewModal = () => {
    const modalId = open(
      <ReviewAddModal
        wineName={wine.name}
        wineId={wine.id}
        onAdd={async (data) => {
          const sendData = {
            ...data,
            wineId: wine.id,
          };

          await createReview(sendData);
          await fetchWine();

          close(modalId);
        }}
      />,
    );
  };

  const ratingData = useMemo(() => {
    if (!wine?.avgRatings) return [];

    const entries = Object.entries(wine.avgRatings).map(([score, count]) => ({
      score: Number(score),
      count: Number(count),
    }));

    const total = entries.reduce((acc, v) => acc + v.count, 0) || 1;

    return entries
      .map((item) => ({
        score: item.score,
        value: Math.round((item.count / total) * 100),
      }))
      .sort((a, b) => b.score - a.score);
  }, [wine]);

  if (!wine) return <div>로딩중...</div>;

  return (
    <div className={styles.wineDetail}>
      <BannerWineCard name={wine.name} region={wine.region} price={wine.price} image={wine.image} />

      <div className={styles.content}>
        <div className={styles.reviewList}>
          <h2>리뷰 목록</h2>
          {wine.reviews.length === 0 ? (
            <NoResult
              showButton
              content="작성된 리뷰가 없어요"
              buttonText="리뷰 남기기"
              onButtonClick={handleOpenReviewModal}
            />
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

            <Button size="xsmall" onClick={handleOpenReviewModal}>
              리뷰 남기기
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
