/**
 * 리스트 형태로 보여주는 와인 카드 컴포넌트
 *
 * 와인의 기본 정보(이름, 지역, 가격)와 별점, 후기 개수, 최신 후기 내용을
 * 한 번에 보여주는 형태의 카드입니다.
 * 카드 전체가 링크로 묶여 있어 클릭 시 해당 와인 상세 페이지로 이동합니다.
 *
 * @component
 *
 * @prop {number} id
 * 와인의 고유 ID.
 * 카드 클릭 시 `/wines/{id}`로 이동하는 데 사용됩니다.
 *
 * @prop {string} name
 * 와인 이름.
 * 이미지 alt 텍스트 및 상단 타이틀로 표시됩니다.
 *
 * @prop {string} region
 * 와인의 생산 지역.
 * 이름 아래의 서브 텍스트로 나타납니다.
 *
 * @prop {number} price
 * 와인 가격(숫자).
 * `toLocaleString('ko-KR')`로 천 단위 콤마가 자동 적용됩니다.
 *
 * @prop {string | StaticImageData} [image]
 * 와인 이미지.
 * 미전달 시 기본 이미지(`wine.png`)가 사용됩니다.
 *
 * @prop {number} rating
 * 평균 별점.
 * 화면에는 소수점 한 자리까지 표시되며, StarRating 컴포넌트에 그대로 넘겨집니다.
 *
 * @prop {number} reviewLength
 * 총 후기 개수.
 * “xx개의 후기” 형태로 표시됩니다.
 *
 * @prop {string} reviewContent
 * 최신 후기 내용.
 * 리뷰 섹션에 표시되며 말줄임 처리는 CSS에서 처리할 수 있습니다.
 *
 * @example
 * // 기본 사용
 * <ListWineCard
 *   id={1}
 *   name="Cabernet Sauvignon 2016"
 *   region="Western Cape, South Africa"
 *   price={64990}
 *   rating={4.8}
 *   reviewLength={12}
 *   reviewContent="바디감이 좋고 향이 풍부해서 만족스러웠어요!"
 * />
 *
 * @example
 * // 이미지 전달
 * <ListWineCard
 *   id={10}
 *   name="Special Red Wine"
 *   region="France"
 *   price={82900}
 *   rating={5}
 *   reviewLength={3}
 *   reviewContent="향이 환상적이에요!"
 *   image={customWine}
 * />
 */

import Image from 'next/image';
import styles from './WineCard.module.scss';
import StarRating from '@/components/common/StarRating/StarRating';
import wine from '@/assets/wine.png';
import Badge from '@/components/common/Badge/Badge';
import Link from 'next/link';
import { RightArrow } from '@/assets';
import type { StaticImageData } from 'next/image';

interface ListWineCardProps {
  id: number;
  name: string;
  region: string;
  price: number;
  image?: string | StaticImageData;
  rating: number;
  reviewLength: number;
  reviewContent: string;
}

export default function ListWineCard({
  id,
  name,
  region,
  price,
  image = wine,
  rating,
  reviewLength,
  reviewContent,
}: ListWineCardProps) {
  return (
    <div className={`${styles.wineContent} ${styles.listCard}`}>
      <Link href={`/wines/${id}`} title={`${name} 페이지로 이동`}>
        <div className={styles.titleArea}>
          <div className={styles.detail}>
            <div className={styles.wine}>
              <Image src={image} alt={name} />
            </div>
            <div className={styles.priceDesc}>
              <strong>{name}</strong>
              <p>{region}</p>
              <Badge prefix="₩">{price.toLocaleString('ko-KR')}</Badge>
            </div>
          </div>
          <div className={styles.starDesc}>
            <strong>{rating.toFixed(1)}</strong>
            <div className={styles.starArea}>
              <StarRating defaultValue={rating} />
            </div>
            <div className={styles.text}>{reviewLength}개의 후기</div>
          </div>
        </div>
        <div className={styles.reviewArea}>
          <strong>최신 후기</strong>
          <p>{reviewContent}</p>
        </div>
        <Image
          src={RightArrow}
          alt="링크 이동 화살표"
          width={36}
          height={36}
          className={styles.arrow}
        />
      </Link>
    </div>
  );
}
