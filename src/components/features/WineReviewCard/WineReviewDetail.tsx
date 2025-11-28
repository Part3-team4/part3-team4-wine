'use client';

import { useState, useRef, useEffect } from 'react';
import Profile from '@/components/common/Profile/Profile';
import styles from './WineReview.module.scss';
import { formatRelativeTime } from '@/utils/formatRelativeTime';
import Badge from '@/components/common/Badge/Badge';
import Image from 'next/image';
import { KebabLg, Like500, MoreArrow, StarActive } from '@/assets';
import Chip from '@/components/common/Chip/Chip';
import WineFlavor from '../WineFlavor/WineFlavor';
import Dropdown from '@/components/common/Dropdown';
import clsx from 'clsx';

interface WineReviewDetailProps {
  profile: {
    name: string;
    avatar?: string;
  };
  createdAt: string | Date;
  rating: number;
  aromas: string[];
  description: string;
  flavor: {
    body: number;
    tannin: number;
    sweetness: number;
    acidity: number;
  };
}

/**
 * 와인 리뷰 상세 화면을 렌더링하는 컴포넌트.
 *
 * - 프로필, 작성일, 향(aroma) 목록, 별점, 맛(flavor) 정보 등을 종합적으로 보여줍니다.
 * - 본문(description)은 아코디언 형태로 열고 닫을 수 있으며 애니메이션이 적용됩니다.
 * - 옵션 메뉴(수정/삭제)는 Dropdown 컴포넌트를 사용해 제어할 수 있습니다.
 * - WineFlavor는 읽기 전용 모드(disabled)로 표시됩니다.
 *
 * @component
 *
 * @param {WineReviewDetailProps} props 리뷰 상세 데이터
 * @param {object} props.profile 작성자 정보
 * @param {string} props.profile.name 작성자 이름
 * @param {string} [props.profile.avatar] 프로필 이미지 URL
 * @param {string | Date} props.createdAt 리뷰 작성일 (상대 시간으로 변환됨)
 * @param {number} props.rating 별점 (0~5)
 * @param {string[]} props.aromas 와인의 향 리스트 (예: ['CHERRY', 'BERRY'])
 * @param {string} props.description 리뷰 본문 내용
 * @param {object} props.flavor 와인의 맛 정보 (WineFlavor 컴포넌트용)
 * @param {number} props.flavor.body 바디감
 * @param {number} props.flavor.tannin 타닌
 * @param {number} props.flavor.sweetness 당도
 * @param {number} props.flavor.acidity 산미
 *
 * @example
 *
 *
 * <WineReviewDetail
 *   profile={{ name: '와인러버', avatar: '/img/profile.png' }}
 *   createdAt="2025-11-28T10:00:00"
 *   rating={4.8}
 *   aromas={['BERRY', 'OAK', 'SPICE']}
 *   description="부드럽고 향이 풍성해요!"
 *   flavor={{ body: 70, tannin: 40, sweetness: 20, acidity: 50 }}
 * />
 *
 *  profile.avatar는 필수값이 아닙니다.
 */

export default function WineReviewDetail({
  profile,
  createdAt,
  rating,
  aromas,
  description,
  flavor,
}: WineReviewDetailProps) {
  const [open, setOpen] = useState(true);
  const [ready, setReady] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    el.style.maxHeight = `${el.scrollHeight}px`;

    requestAnimationFrame(() => {
      setReady(true);
    });
  }, []);

  const toggle = () => {
    const el = contentRef.current;
    if (!el) return;

    // 열기
    if (!open) {
      el.style.maxHeight = `${el.scrollHeight}px`;
    } else {
      // 닫기
      el.style.maxHeight = `0px`;
    }

    setOpen((prev) => !prev);
  };

  return (
    <div className={`${styles.wineReviewWrap} ${styles.wineReviewDetail}`}>
      <div className={styles.profileArea}>
        {profile.avatar ? <Profile size={64} src={profile.avatar} /> : <Profile size={64} />}
        <div className={styles.profileDetail}>
          <strong>{profile.name}</strong>
          <span>{formatRelativeTime(createdAt)}</span>
        </div>
      </div>
      <div className={styles.aromaStarArea}>
        <ul>
          {aromas.map((label) => (
            <li key={label}>
              <Chip>{label}</Chip>
            </li>
          ))}
        </ul>
        <Badge prefix={<Image src={StarActive} width={20} alt={`별점 ${rating} 점`} />}>
          {rating.toFixed(1)}
        </Badge>
      </div>
      <div
        id="acco-panel"
        role="region"
        aria-labelledby="acco-btn"
        ref={contentRef}
        className={clsx(styles.acoContent, ready && styles.ready)}
        style={open ? { maxHeight: contentRef.current?.scrollHeight } : { maxHeight: 0 }}
      >
        <p className={styles.desc}>{description}</p>
        <div className={styles.wineflaverArea}>
          <WineFlavor
            disabled
            values={{
              body: flavor.body,
              tannin: flavor.tannin,
              sweetness: flavor.sweetness,
              acidity: flavor.acidity,
            }}
          />
        </div>
      </div>
      <div className={styles.btnArea}>
        <button
          id="acco-btn"
          aria-expanded={open}
          aria-controls="acco-panel"
          className={clsx(styles.toggleBtn, open && styles.open)}
          onClick={toggle}
        >
          <Image src={MoreArrow} alt="더보기" width={30} />
        </button>
      </div>
      <div className={styles.etcArea}>
        <Image src={Like500} alt="좋아요" className={styles.like} width={38} height={38} />
        <Dropdown
          onChange={(value) => {
            // 여기는 테스트 중..
            if (value === 'edit') console.log('수정하기 클릭');
            if (value === 'delete') console.log('삭제하기 클릭');
          }}
        >
          <Dropdown.Trigger>
            <Image src={KebabLg} alt="더보기" width={38} height={38} />
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
