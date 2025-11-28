/**
 * 마이페이지에서 표시되는 와인 카드 컴포넌트
 *
 * 사용자의 저장 목록에 포함된 와인을 카드 형태로 보여주는 구성입니다.
 * 이름, 지역, 가격을 표시하고, 우측 상단에는 Kebab 메뉴(드롭다운)를 통해
 * 수정/삭제 등 액션을 수행할 수 있습니다.
 *
 * @component
 *
 * @prop {string} name
 * 와인의 이름.
 * 카드 타이틀로 표시되며 이미지의 alt 텍스트에도 사용됩니다.
 *
 * @prop {string} region
 * 와인의 생산 지역.
 * 와인 이름 아래의 서브 텍스트로 나타납니다.
 *
 * @prop {number} price
 * 와인의 가격(숫자).
 * `toLocaleString('ko-KR')`를 통해 천 단위 콤마가 자동 적용됩니다.
 *
 * @prop {string | StaticImageData} [image]
 * 와인 이미지.
 * 전달하지 않으면 기본 와인 이미지(`wine.png`)가 사용됩니다.
 *
 * @example
 * // 기본 사용
 * <MylistWineCard
 *   name="Cabernet Sauvignon 2016"
 *   region="Western Cape, South Africa"
 *   price={64990}
 * />
 *
 * @example
 * // 이미지 전달
 * <MylistWineCard
 *   name="Special Wine"
 *   region="France"
 *   price={89000}
 *   image={customWine}
 * />
 *
 */

import Badge from '@/components/common/Badge/Badge';
import styles from './WineCard.module.scss';
import wine from '@/assets/wine.png';
import Image from 'next/image';
import Dropdown from '@/components/common/Dropdown/';
import { KebabLg } from '@/assets';
import type { StaticImageData } from 'next/image';

interface MylistWineCardProps {
  name: string;
  region: string;
  price: number;
  image?: string | StaticImageData;
}

export default function MylistWineCard({ name, region, price, image = wine }: MylistWineCardProps) {
  return (
    <div className={`${styles.wineContent} ${styles.myListCard}`}>
      <div className={styles.wine}>
        <Image src={image} alt={name} />
      </div>
      <div className={styles.priceDesc}>
        <strong>{name}</strong>
        <p>{region}</p>
        <Badge prefix="₩">{price.toLocaleString('ko-KR')}</Badge>
      </div>
      <div className={styles.dropdownArea}>
        <Dropdown>
          <Dropdown.Trigger>
            <Image src={KebabLg} alt="ss" width={26} height={26} />
          </Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item value="edit">
              <button>수정하기</button>
            </Dropdown.Item>
            <Dropdown.Item value="del">
              <button>수정하기</button>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}
