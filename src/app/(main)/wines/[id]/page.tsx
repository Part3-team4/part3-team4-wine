import BannerWineCard from '@/components/features/WineCard/BannerWineCard';
import styles from './page.module.scss';
import WineReviewDetail from '@/components/features/WineReviewCard/WineReviewDetail';
import Button from '@/components/common/Button/Button';
import StarRating from '@/components/common/StarRating/StarRating';
import RatingDistributionBar from '@/components/features/RatingDistributionBar/RatingDistributionBar';

const ratingData = [
  { score: 5, value: 80 },
  { score: 4, value: 70 },
  { score: 3, value: 25 },
  { score: 2, value: 10 },
  { score: 1, value: 2 },
];

export default function page() {
  return (
    <div className={styles.wineDetail}>
      <BannerWineCard name={'와인이름쓰'} region={'머시기머시기'} price={54433} />
      <div className={styles.content}>
        <div className={styles.reviewList}>
          <h2>리뷰 목록</h2>
          <ul className={styles.list}>
            <li>
              <WineReviewDetail
                profile={{ name: '와인러버' }}
                createdAt="2025-11-28T10:00:00"
                rating={4.8}
                aromas={['체리', '오크', '카라멜']}
                description="부드럽고 향이 풍성해요!"
                flavor={{ body: 70, tannin: 40, sweetness: 20, acidity: 50 }}
              />
            </li>
            <li>
              <WineReviewDetail
                profile={{ name: '와인러버' }}
                createdAt="2025-11-28T10:00:00"
                rating={4.8}
                aromas={['체리', '오크', '카라멜']}
                description="부드럽고 향이 풍성해요!"
                flavor={{ body: 70, tannin: 40, sweetness: 20, acidity: 50 }}
              />
            </li>
            <li>
              <WineReviewDetail
                profile={{ name: '와인러버' }}
                createdAt="2025-11-28T10:00:00"
                rating={4.8}
                aromas={['체리', '오크', '카라멜']}
                description="부드럽고 향이 풍성해요!"
                flavor={{ body: 70, tannin: 40, sweetness: 20, acidity: 50 }}
              />
            </li>
          </ul>
        </div>
        <div className={styles.reviewScore}>
          <div className={styles.starArea}>
            <strong>4.8</strong>
            <div>
              <StarRating defaultValue={4} />
              <span>5,555개 후기</span>
            </div>
          </div>
          <div className={styles.ratingArea}>
            <RatingDistributionBar data={ratingData} />
          </div>
          <Button size="xsmall">리뷰 남기기</Button>
        </div>
      </div>
    </div>
  );
}
