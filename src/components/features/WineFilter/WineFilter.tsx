'use client';

import { useState } from 'react';
import styles from './WineFilter.module.scss';
import Chip from '@/components/common/Chip/Chip';
import { WINE_TYPE_OPTIONS } from '@/constants/wine';
import type { WineType } from '@/constants/wine';
import Scale from '@/components/common/Scale/Scale';

export interface WineFilterValue {
  wineTypes: WineType[];
  minPrice: number;
  maxPrice: number;
  rating?: number;
}

// 상태관리 전 UI 구현을 위해 선택적 프롭스 처리했습니다.
interface WineFilterProps {
  value?: WineFilterValue;
  onChange?: (value: WineFilterValue) => void;
  priceRange?: {
    min: number;
    max: number;
    step: number;
  };
}

const DEFAULT_PRICE_RANGE = {
  min: 0,
  max: 100000,
  step: 1000,
};

/**
 * 와인 필터링을 위한 컴포넌트
 *
 * - 와인 타입, 가격 범위, 평점을 기준으로 필터링할 수 있습니다.
 * - 와인 타입은 다중 선택이 가능하며, Chip 컴포넌트로 표시됩니다.
 * - 가격 범위는 Scale 컴포넌트를 통해 최소/최대값을 조정할 수 있습니다.
 *
 * @example
 * // 1. 독립적으로 사용 (내부 상태 관리)
 * <WineFilter />
 *
 * @example
 * // 2. 부모 컴포넌트에서 상태 관리 (제어 컴포넌트)
 * const [filterValue, setFilterValue] = useState<WineFilterValue>({
 *   wineTypes: [],
 *   minPrice: 0,
 *   maxPrice: 74000
 * });
 *
 * <WineFilter value={filterValue} onChange={setFilterValue} />
 *
 * @example
 * // 3. API 연동 예시
 * const fetchWines = async () => {
 *   const params = new URLSearchParams({
 *     types: filterValue.wineTypes.join(','),
 *     minPrice: filterValue.minPrice.toString(),
 *     maxPrice: filterValue.maxPrice.toString(),
 *   });
 *   await fetch(`/api/wines?${params}`);
 * };
 */

export default function WineFilter({
  value: propValue,
  onChange,
  priceRange = DEFAULT_PRICE_RANGE,
}: WineFilterProps) {
  // UI 구현을 위한 내부상태 관리
  const [internalValue, setInternalValue] = useState<WineFilterValue>({
    wineTypes: [],
    minPrice: 0,
    maxPrice: 74000,
  });

  // props가 있으면 props를, 없으면 내부 상태를 사용합니다.
  const value = propValue || internalValue;

  const toggleWineType = (wine: WineType) => {
    const newWineTypes = value.wineTypes.includes(wine)
      ? value.wineTypes.filter((type) => type !== wine)
      : [...value.wineTypes, wine];

    const newValue = {
      ...value,
      wineTypes: newWineTypes,
    };

    if (onChange) {
      // props로 onChange가 전달된 경우 (제어 컴포넌트)
      onChange(newValue);
    } else {
      // 내부 상태 사용하는 경우 (비제어 컴포넌트)
      setInternalValue(newValue);
    }
  };

  const handlePriceChange = (newMin: number, newMax: number) => {
    const newValue = {
      ...value,
      minPrice: newMin,
      maxPrice: newMax,
    };
    if (onChange) {
      // props로 onChange가 전달된 경우 (제어 컴포넌트)
      onChange(newValue);
    } else {
      // 내부 상태 사용하는 경우 (비제어 컴포넌트)
      setInternalValue(newValue);
    }
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
              selected={value.wineTypes.includes(option.value)}
              onClick={() => toggleWineType(option.value)}
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
            min={priceRange.min}
            max={priceRange.max}
            step={priceRange.step}
            disabled={false}
            minValue={value.minPrice}
            maxValue={value.maxPrice}
            leftLabel={`₩ ${value.minPrice.toLocaleString('ko-KR')}`}
            rightLabel={`₩ ${value.maxPrice.toLocaleString('ko-KR')}`}
            showBubble
            onChange={handlePriceChange}
          />
        </div>
      </div>
      <div className={styles.ratingWrapper}>
        <h2 className={styles.subTitle}>RATING</h2>
      </div>
    </div>
  );
}
