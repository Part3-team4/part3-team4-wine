/**
 * 추천 와인 카드 컴포넌트
 *
 * 사용자가 전달한 이미지, 평점, 와인 이름을 기반으로 카드 형태로 렌더링합니다.
 * 내부에 별점 컴포넌트(StarRating)를 포함하고 있으며,
 * `rating` 값은 소수 첫째 자리까지 포맷되어 표시됩니다.
 *
 * @component
 *
 * @prop {number} id
 * 와인 상세로 이동하기에 사용됩니다.
 *
 * @prop {string | StaticImageData} [image]
 * 표시할 와인 이미지.
 * 미전달 시 기본 와인 이미지(`wine.png`)가 사용됩니다.
 *
 * @prop {number} rating
 * 와인의 평점 값.
 * 0 ~ 5 사이의 숫자를 입력하며, 화면에는 소수점 첫째 자리까지 표시됩니다.
 *
 * @prop {string} name
 * 와인의 이름.
 * 줄바꿈 없이 그대로 출력되며, 이미지의 alt 속성에도 사용됩니다.
 *
 * @example
 * // 기본 사용 예시
 * <RecommendWineCard
 *   id={1}
 *   rating={4.7}
 *   name="Sentinel Cabernet Sauvignon 2016"
 * />
 *
 * @example
 * // 이미지 전달
 * <RecommendWineCard
 *   id={1}
 *   image={customWine}
 *   rating={5}
 *   name="Special Edition Red"
 * />
 */

import Image from 'next/image';
import styles from './WineCard.module.scss';
import StarRating from '@/components/common/StarRating/StarRating';
import wine from '@/assets/wine.png';
import type { StaticImageData } from 'next/image';
import Link from 'next/link';

interface RecommendWineCardProps {
  id: number;
  image?: string | StaticImageData;
  rating: number;
  name: string;
}

export default function RecommendWineCard({
  id,
  image = wine,
  rating,
  name,
}: RecommendWineCardProps) {
  const numericRating = Number(rating);
  return (
    <Link href={`/wines/${id}`} title={`${name} 페이지로 이동`} className={styles.recommend}>
      <div className={styles.wine}>
        <Image src={image} alt={name} width={200} height={200} />
      </div>
      <div className={styles.starDesc}>
        <strong>{numericRating.toFixed(1)}</strong>
        <div className={styles.starArea}>
          <StarRating defaultValue={rating} />
        </div>
        <div className={styles.text}>{name}</div>
      </div>
    </Link>
  );
}
