'use client';

import { useState } from 'react';
import Scale from '@/components/common/Scale/Scale';
import styles from './WineFlavor.module.scss';
import clsx from 'clsx';

interface WineFlavorProps {
  values?: {
    body: number;
    tannin: number;
    sweetness: number;
    acidity: number;
  };
  onChange?: (values: WineFlavorProps['values']) => void;
  disabled?: boolean;
}

/**
 * 와인의 맛 특성을 나타내는 4가지 척도(바디감, 타닌, 당도, 산미)를
 * 슬라이더로 조절할 수 있는 컴포넌트입니다.
 *
 * @component
 * @example
 * // 1. 독립적으로 사용 (내부 상태 관리)
 * <WineFlavor />
 *
 * // 움직이지 않게 지정
 * <WineFlavor disabled />
 *
 * @example
 * // 2. 부모 컴포넌트에서 상태 관리 (제어 컴포넌트)
 * const [flavorValues, setFlavorValues] = useState({
 *   body: 50,
 *   tannin: 50,
 *   sweetness: 50,
 *   acidity: 50
 * });
 *
 * <WineFlavor
 *   values={flavorValues}
 *   onChange={setFlavorValues}
 * />
 *
 * @example
 * // 3. API 연동 예시
 * const handleSubmit = async () => {
 *   await fetch('/api/wine-flavor', {
 *     method: 'POST',
 *     body: JSON.stringify(flavorValues)
 *   });
 * };
 */

/**
 * @typedef {Object} WineFlavorValues
 * @property {number} body - 바디감 (0-100, 가벼워요 ~ 진해요)
 * @property {number} tannin - 타닌 (0-100, 부드러워요 ~ 떫어요)
 * @property {number} sweetness - 당도 (0-100, 드라이해요 ~ 달아요)
 * @property {number} acidity - 산미 (0-100, 안셔요 ~ 많이셔요)
 */
export default function WineFlavor({
  values: propValues,
  onChange,
  disabled = false,
}: WineFlavorProps) {
  // UI 구현을 위해 내부상태로 관리합니다.
  const [internalValues, setInternalValues] = useState({
    body: 50,
    tannin: 50,
    sweetness: 50,
    acidity: 50,
  });

  // props가 있으면 props를, 없으면 내부 상태를 사용합니다.
  const values = propValues || internalValues;

  const flavorScales = [
    {
      key: 'body',
      label: '바디감',
      leftText: '가벼워요',
      rightText: '진해요',
    },
    {
      key: 'tannin',
      label: '타닌',
      leftText: '부드러워요',
      rightText: '떫어요',
    },
    {
      key: 'sweetness',
      label: '당도',
      leftText: '드라이해요',
      rightText: '달아요',
    },
    {
      key: 'acidity',
      label: '산미',
      leftText: '안셔요',
      rightText: '많이셔요',
    },
  ];

  const handleChange = (key: string, value: number) => {
    const newValues = { ...values, [key]: value };

    if (onChange) {
      // props로 onChange가 전달된 경우 (제어 컴포넌트)
      onChange(newValues);
    } else {
      // 내부 상태 사용하는 경우 (비제어 컴포넌트)
      setInternalValues(newValues);
    }
  };

  return (
    <div className={styles.wineFlavor}>
      {flavorScales.map((scale) => (
        <section key={scale.key} className={styles.wrapper}>
          <div className={styles.label}>{scale.label}</div>
          <span className={styles.text}>{scale.leftText}</span>
          <Scale
            type="single"
            min={0}
            max={100}
            step={1}
            disabled={disabled}
            value={values[scale.key as keyof typeof values]}
            onChange={(value) => handleChange(scale.key, value)}
            className={styles.scale}
          />
          <span className={clsx(styles.text, styles.rightText)}>{scale.rightText}</span>
        </section>
      ))}
    </div>
  );
}
