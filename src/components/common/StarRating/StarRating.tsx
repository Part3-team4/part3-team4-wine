/**
 * 별점을 표시하거나 사용자가 별점을 선택할 수 있는 컴포넌트입니다.
 *
 * - 기본 별과 활성 별이 겹쳐져 렌더링되며, 활성 상태에 따라 강조됩니다.
 * - 클릭 가능한 상태일 경우, 사용자가 클릭한 위치에 따라 현재 별점이 변경됩니다.
 * - 부모는 defaultValue로 초기 값을 설정할 수 있습니다.
 *
 * @prop {number} [defaultValue=0] 초기 별점 값
 * @prop {boolean} [clickable=true] 사용자가 클릭으로 별점을 변경할 수 있는지 여부
 * @prop {number} [max=5] 최대 별 개수
 *
 * @example
 * // 기본 별점 표시
 * <StarRating defaultValue={3} />
 *
 * // defaultValue 가 없으면 0점
 * <StarRating />
 *
 * @example
 * // 클릭 가능한 별점 선택 UI
 * <StarRating
 *   defaultValue={2}
 *   clickable
 * />
 *
 * // defaultValue 가 없으면 0점
 * <StarRating
 *   clickable
 * />
 *
 */

'use client';

import { useEffect, useState } from 'react';
import styles from './StarRating.module.scss';
import { Star, StarActive } from '@/assets';
import Image from 'next/image';
import clsx from 'clsx';

interface StarRatingProps {
  defaultValue?: number;
  clickable?: boolean;
  max?: number;
  onChange?: (value: number) => void;
}

export default function StarRating({
  defaultValue = 0,
  clickable = false,
  max = 5,
  onChange,
}: StarRatingProps) {
  const [current, setCurrent] = useState(defaultValue);

  const handleClick = (index: number) => {
    if (!clickable) return;

    const nextValue = index + 1;

    setCurrent(nextValue);
    onChange?.(nextValue); // 🔥 여기서 부모에게 바로 전달
  };

  return (
    <ul className={styles.starRatingList}>
      {Array.from({ length: max }).map((_, i) => {
        const isActive = i < current;

        return (
          <li key={i}>
            <button
              type="button"
              disabled={clickable ? false : true}
              className={clsx(styles.star, { [styles.clickable]: clickable })}
              onClick={() => handleClick(i)}
            >
              {/* 기본 별 */}
              <Image src={Star} alt="별점 비활성화" className={styles.icon} />
              {/* 활성 별 */}
              <Image
                src={StarActive}
                alt="별점 활성화"
                className={clsx(styles.icon, { [styles.active]: isActive })}
              />
            </button>
          </li>
        );
      })}
    </ul>
  );
}
