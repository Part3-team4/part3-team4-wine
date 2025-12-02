'use client';

import { useState } from 'react';
import styles from './WineFilter.module.scss';
import Chip from '@/components/common/Chip/Chip';
import { WINE_TYPE_OPTIONS } from '@/constants/wine';
import type { WineType } from '@/constants/wine';
import Scale from '@/components/common/Scale/Scale';
import { Radio } from '@/components/common/Radio/Radio';

const DEFAULT_PRICE_RANGE = {
  min: 0,
  max: 100000,
  step: 1000,
};

const DEFAULT_RATING_OPTIONS = [
  { label: '전체', value: 'all' },
  { label: '4.5 - 5.0', value: '4_8To5_0' },
  { label: '4.0 - 4.5', value: '4_5To4_8' },
  { label: '3.5 - 4.0', value: '4_0To4_5' },
  { label: '3.0 - 3.5', value: '3_0To4_0' },
];
export interface WineFilterValue {
  wineTypes: WineType[];
  minPrice: number;
  maxPrice: number;
  rating: string;
}

// 상태관리 전 UI 구현을 위해 선택적 프롭스 처리했습니다.
interface WineFilterProps {
  value?: WineFilterValue;
  onChange?: (value: WineFilterValue) => void;
  priceRange?: typeof DEFAULT_PRICE_RANGE;
  ratingOptions?: typeof DEFAULT_RATING_OPTIONS;
}

/**
 * 와인 필터링을 위한 컴포넌트
 *
 * - 와인 타입, 가격 범위, 평점을 기준으로 필터링할 수 있습니다.
 * - 외부에서 value/onChange를 넘기면 "제어 컴포넌트", 넘기지 않으면 "비제어 컴포넌트"로 동작합니다.
 * @example
 * // 내부 상태 사용 (비제어)
 * <WineFilter />
 *
 * @example
 * // 부모에서 값 관리 (제어)
 * const [value, setValue] = useState<WineFilterValue>({
 *   wineTypes: [],
 *   minPrice: 10000,
 *   maxPrice: 50000,
 *   rating: 'all',
 * });
 * <WineFilter value={value} onChange={setValue} />
 *
 * @example
 * // API 연동 예시
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
  ratingOptions = DEFAULT_RATING_OPTIONS,
}: WineFilterProps) {
  // UI 구현을 위한 내부상태 관리
  const [internalValue, setInternalValue] = useState<WineFilterValue>({
    wineTypes: [],
    minPrice: 0,
    maxPrice: 74000,
    rating: 'all',
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

  const handleRatingChange = (newRating: string) => {
    const newValue = {
      ...value,
      rating: newRating,
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
            className={styles.priceRange}
          />
        </div>
      </div>
      <div className={styles.ratingWrapper}>
        <h2 className={styles.subTitle}>RATING</h2>
        <Radio
          options={ratingOptions}
          selectedValue={value.rating}
          onValueChange={handleRatingChange}
          className={styles.radio}
        />
      </div>
    </div>
  );
}
