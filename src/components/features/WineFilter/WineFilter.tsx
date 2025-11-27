'use client';

import { useState } from 'react';
import styles from './WineFilter.module.scss';
import Chip from '@/components/common/Chip/Chip';
import { WINE_TYPE_OPTIONS } from '@/constants/wine';
import type { WineType } from '@/constants/wine';
import Scale from '@/components/common/Scale/Scale';

/**
 * 와인 필터링을 위한 컴포넌트
 *
 * - 와인 타입, 가격 범위, 평점을 기준으로 필터링할 수 있습니다.
 * - 와인 타입은 다중 선택이 가능하며, Chip 컴포넌트로 표시됩니다.
 * - 가격 범위는 Scale 컴포넌트를 통해 최소/최대값을 조정할 수 있습니다.
 * - 선택된 필터 값은 내부 상태로 관리됩니다.
 *
 * @example
 * // 기본 사용
 * <WineFilter />
 * }
 */
export default function WineFilter() {
  const [selected, setSelected] = useState<WineType[]>([]);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(74000);

  const toggleWine = (wine: WineType) => {
    setSelected((prev) =>
      prev.includes(wine)
        ? prev.filter((selectedWineType) => selectedWineType !== wine)
        : [...prev, wine],
    );
  };

  return (
    <div className={styles.filterWrapper}>
      <div className={styles.wineTypesWrapper}>
        <h3 className={styles.subTitle}>WINE TYPES</h3>
        <div className={styles.wineTypesChip}>
          {WINE_TYPE_OPTIONS.map((option) => (
            <Chip
              key={option.value}
              clickable
              selected={selected.includes(option.value)}
              onClick={() => toggleWine(option.value)}
            >
              {option.label}
            </Chip>
          ))}
        </div>
      </div>
      <div className={styles.priceWrapper}>
        <h2 className={styles.subTitle}>PRICE</h2>
        <div className={styles.priceRange}>
          <Scale
            type="range"
            min={0}
            max={100000}
            step={1000}
            disabled={false}
            minValue={minValue}
            maxValue={maxValue}
            leftLabel={`₩ ${minValue.toLocaleString()}`}
            rightLabel={`₩ ${maxValue.toLocaleString()}`}
            showBubble
            onChange={(newMin, newMax) => {
              setMinValue(newMin);
              setMaxValue(newMax);
            }}
          />
        </div>
      </div>
      <div className={styles.ratingWrapper}>
        <h2 className={styles.subTitle}>RATING</h2>
      </div>
    </div>
  );
}
