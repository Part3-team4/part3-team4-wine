/**
 * 배너 형태의 와인 카드 컴포넌트
 *
 * 전달된 와인 이름, 지역, 가격을 배너 스타일로 보여주는 카드입니다.
 * 기본 와인 이미지가 있으며, 필요하면 커스텀 이미지를 전달할 수 있습니다.
 * 가격은 자동으로 `ko-KR` 로케일 기준으로 포맷됩니다.
 *
 * @component
 *
 * @prop {string} name
 * 와인의 이름.
 * 카드의 메인 타이틀로 표시되며, 이미지의 alt 텍스트에도 활용됩니다.
 *
 * @prop {string} region
 * 와인의 생산 지역.
 * 이름 아래 작은 텍스트로 노출됩니다.
 *
 * @prop {number} price
 * 와인의 가격(숫자).
 * 64,990 같은 형식으로 자동 변환되어 Badge 컴포넌트로 표시됩니다.
 *
 * @prop {string | StaticImageData} [image]
 * 표시할 와인 이미지.
 * 전달하지 않으면 기본 이미지(`wine.png`)가 사용됩니다.
 *
 * @example
 * // 기본 사용
 * <BannerWineCard
 *   name="Sentinel Cabernet Sauvignon 2016"
 *   region="Western Cape, South Africa"
 *   price={64990}
 * />
 *
 * @example
 * // 이미지 전달
 * <BannerWineCard
 *   name="Special Edition Red"
 *   region="France"
 *   price={82900}
 *   image={customWine}
 * />
 */

import Badge from '@/components/common/Badge/Badge';
import styles from './WineCard.module.scss';
import wine from '@/assets/wine.png';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';

interface BannerWineCardProps {
  name: string;
  region: string;
  price: number;
  image?: string | StaticImageData;
}

export default function BannerWineCard({ name, region, price, image = wine }: BannerWineCardProps) {
  return (
    <div className={`${styles.wineContent} ${styles.bannerCard}`}>
      <div className={styles.wine}>
        <Image src={image} alt={name} width={58} height={200} />
      </div>
      <div className={styles.priceDesc}>
        <strong>{name}</strong>
        <p>{region}</p>
        <Badge prefix="₩">{price.toLocaleString('ko-KR')}</Badge>
      </div>
    </div>
  );
}
