'use client';

import { useRef, useState, useEffect } from 'react';
import clsx from 'clsx';
import styles from './Scale.module.scss';
import { formatCurrency } from '@/utils/formatCurrency';

type BaseProps = {
  min: number;
  max: number;
  step: number;
  disabled: boolean;
  className?: string;
};

type SingleScaleProps = BaseProps & {
  type: 'single';
  value: number;
  onChange: (value: number) => void;
};

type RangeScaleProps = BaseProps & {
  type: 'range';
  minValue: number;
  maxValue: number;
  onChange: (minValue: number, maxValue: number) => void;
  showBubble: boolean;
  leftLabel: React.ReactNode;
  rightLabel: React.ReactNode;
  format?: (v: number) => string;
};

type ScaleProps = SingleScaleProps | RangeScaleProps;

/**
 * 공용 Scale 컴포넌트
 *
 * @description
 * 단일 모드(single)와 범위 모드(range)를 모두 지원하는 슬라이더 컴포넌트입니다.
 * 내부적으로 SingleScale 또는 RangeScale을 자동으로 렌더링합니다.
 *
 * @example
 * // 단일 슬라이더
 *   const [singleValue, setSingleValue] = useState(50);
 *
 * <Scale
 *  type="single"
 *  min={0}
 *  max={100}
 *  step={1}
 *  disabled={false}
 *  value={singleValue}
 *  onChange={setSingleValue}
/>

 *
 * @example
 * // 범위 슬라이더
 *  const [minValue, setMinValue] = useState(10000);
 *  const [maxValue, setMaxValue] = useState(70000);
 *
 * <Scale
 *   type="range"
 *   min={0}
 *   max={100000}
 *   step={1000}
 *   disabled={false}
 *   minValue={minValue}
 *   maxValue={maxValue}
 *   leftLabel={`₩ ${minValue.toLocaleString()}`}
 *   rightLabel={`₩ ${maxValue.toLocaleString()}`}
 *   showBubble
 *   onChange={(newMin, newMax) => {
 *     setMinValue(newMin);
 *     setMaxValue(newMax);
 *   }}
 *  />
 */
export default function Scale(props: ScaleProps) {
  return props.type === 'single' ? <SingleScale {...props} /> : <RangeScale {...props} />;
}

/**
 * 단일 슬라이더
 */
function SingleScale({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  className,
  disabled,
}: SingleScaleProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  const valueToPercent = (val: number) => ((val - min) / (max - min)) * 100;

  const getValueFromMouseX = (clientX: number) => {
    if (!wrapperRef.current) return value;

    const rect = wrapperRef.current.getBoundingClientRect();
    const percent = ((clientX - rect.left) / rect.width) * 100;
    const clampedPercent = Math.max(0, Math.min(100, percent));
    const rawValue = (clampedPercent / 100) * (max - min) + min;
    return Math.round(rawValue / step) * step;
  };

  useEffect(() => {
    if (disabled || !dragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!wrapperRef.current) return;

      const newValue = getValueFromMouseX(e.clientX);
      onChange(newValue);
    };

    const handleMouseUp = () => setDragging(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, disabled, min, max, step, onChange, value]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!disabled) {
      e.preventDefault();
      setDragging(true);
      const newValue = getValueFromMouseX(e.clientX);
      onChange(newValue);
    }
  };

  const percent = valueToPercent(value);

  return (
    <div ref={wrapperRef} className={clsx(styles.scaleWrapper, className)}>
      <div className={styles.track} onClick={handleMouseDown} />
      <div style={{ left: 0, width: `${percent}%` }} />
      <div
        className={clsx(styles.thumb, disabled && styles.disabled)}
        style={{ left: `${percent}%` }}
        onMouseDown={handleMouseDown}
        role="slider"
        aria-label="슬라이더"
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        tabIndex={disabled ? -1 : 0}
      />
    </div>
  );
}

/**
 * 범위 슬라이더
 */
function RangeScale({
  min = 0,
  max = 100,
  step = 1,
  minValue,
  maxValue,
  onChange,
  className,
  disabled,
  showBubble = true,
  leftLabel,
  rightLabel,
  format = formatCurrency,
}: RangeScaleProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<'min' | 'max' | null>(null);

  const valueToPercent = (val: number) => ((val - min) / (max - min)) * 100;

  const getValueFromMouseX = (clientX: number) => {
    if (!wrapperRef.current) return min;

    const rect = wrapperRef.current.getBoundingClientRect();
    const percent = ((clientX - rect.left) / rect.width) * 100;
    const clampedPercent = Math.max(0, Math.min(100, percent));
    const rawValue = (clampedPercent / 100) * (max - min) + min;
    return Math.round(rawValue / step) * step;
  };

  useEffect(() => {
    if (disabled || !dragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newValue = getValueFromMouseX(e.clientX);

      if (dragging === 'min') {
        onChange(Math.min(newValue, maxValue), maxValue);
      } else {
        onChange(minValue, Math.max(newValue, minValue));
      }
    };

    const handleMouseUp = () => setDragging(null);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, minValue, maxValue, disabled, min, max, step, onChange]);

  const handleMouseDown = (type: 'min' | 'max') => (e: React.MouseEvent) => {
    if (!disabled) {
      e.preventDefault();
      setDragging(type);
    }
  };

  const minPercent = valueToPercent(minValue);
  const maxPercent = valueToPercent(maxValue);

  return (
    <div ref={wrapperRef} className={clsx(styles.scaleWrapper, className)}>
      <div className={clsx(styles.track, styles.rangeTrack)} />
      <div
        className={styles.rangeFill}
        style={{
          left: `${minPercent}%`,
          width: `${maxPercent - minPercent}%`,
        }}
      />
      <div className={styles.thumbWrapper} style={{ left: `${minPercent}%` }}>
        {showBubble && <div className={styles.thumbLabel}>{leftLabel}</div>}
        <div
          className={clsx(styles.rangeThumb, disabled && styles.disabled)}
          onMouseDown={handleMouseDown('min')}
          role="slider"
          aria-label="최소값"
          aria-valuenow={minValue}
          aria-valuemin={min}
          aria-valuemax={max}
          tabIndex={disabled ? -1 : 0}
        />
      </div>
      <div className={styles.thumbWrapper} style={{ left: `${maxPercent}%` }}>
        {showBubble && <div className={styles.thumbLabel}>{rightLabel}</div>}
        <div
          className={clsx(styles.rangeThumb, disabled && styles.disabled)}
          onMouseDown={handleMouseDown('max')}
          role="slider"
          aria-label="최대값"
          aria-valuenow={maxValue}
          aria-valuemin={min}
          aria-valuemax={max}
          tabIndex={disabled ? -1 : 0}
        />
      </div>
    </div>
  );
}
