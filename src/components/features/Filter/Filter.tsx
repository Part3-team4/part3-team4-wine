'use client';

import { useState } from 'react';
import styles from './Filter.module.scss';
import Chip from '@/components/common/Chip/Chip';
import { WINE_TYPE_OPTIONS } from '@/constants/wine';
import type { WineType } from '@/constants/wine';
import Scale from '@/components/common/Scale/Scale';

export default function Filter() {
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
