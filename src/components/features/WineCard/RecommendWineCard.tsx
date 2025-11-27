import Image from 'next/image';
import styles from './WineCard.module.scss';
import StarRating from '@/components/common/StarRating/StarRating';
import wine from '@/assets/wine.png';

export default function RecommendWineCard() {
  return (
    <div className={styles.recommend}>
      <div className={styles.wine}>
        <Image src={wine} alt="와인" />
      </div>
      <div className={styles.starDesc}>
        <strong>5.0</strong>
        <div className={styles.starArea}>
          <StarRating defaultValue={5} />
        </div>
        <div className={styles.text}>
          Sentinel
          <br />
          Carbernet
          <br />
          Sauvignon 2016
        </div>
      </div>
    </div>
  );
}
