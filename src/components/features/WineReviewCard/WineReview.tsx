'use client';

import Badge from '@/components/common/Badge/Badge';
import styles from './WineReview.module.scss';
import { KebabLg, StarActive } from '@/assets';
import Image from 'next/image';
import { formatRelativeTime } from '@/utils/formatRelativeTime';
import Dropdown from '@/components/common/Dropdown';

interface WineReviewProps {
  name: string;
  rating: number;
  date: string | Date;
  content: string;
}

/**
 * 단일 와인 리뷰 카드를 표시하는 컴포넌트.
 *
 * - 리뷰 작성자 이름, 별점, 상대 시간, 내용 등을 보여줍니다.
 * - 옵션 메뉴(수정/삭제)는 Dropdown 컴포넌트로 전달받아 제어할 수 있습니다.
 *
 * @component
 *
 * @param {WineReviewProps} props 리뷰 데이터
 * @param {string} props.name 리뷰 작성자 이름
 * @param {number} props.rating 리뷰 별점 (예: 4.5)
 * @param {string | Date} props.date 리뷰 작성 날짜 또는 문자열
 * @param {string} props.content 리뷰 본문 내용
 *
 * @example
 * <WineReview
 *   name="와인러버"
 *   rating={4.5}
 *   date="2025-11-28T12:00:00"
 *   content="향이 정말 좋고 바디감도 묵직해요!"
 * />
 */

export default function WineReview({ name, rating, date, content }: WineReviewProps) {
  return (
    <div className={`${styles.wineReviewWrap} ${styles.wineReview}`}>
      <div className={styles.info}>
        <Badge prefix={<Image src={StarActive} width={20} alt={`별점 ${rating} 점`} />}>
          {rating.toFixed(1)}
        </Badge>
        <span className={styles.date}>{formatRelativeTime(date)}</span>
      </div>
      <strong className={styles.name}>{name}</strong>
      <p className={styles.content}>{content}</p>
      <div className={styles.dropdownWrap}>
        <Dropdown
          onChange={(value) => {
            // 여기는 테스트 중..
            if (value === 'edit') console.log('수정하기 클릭');
            if (value === 'delete') console.log('삭제하기 클릭');
          }}
        >
          <Dropdown.Trigger>
            <Image src={KebabLg} alt="추가 메뉴" width={26} height={26} />
          </Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item value="edit">
              <button>수정하기</button>
            </Dropdown.Item>
            <Dropdown.Item value="delete">
              <button>삭제하기</button>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}
