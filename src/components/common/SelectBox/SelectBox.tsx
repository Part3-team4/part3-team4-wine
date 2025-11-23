import styles from '@/components/common/SelectBox/SelectBox.module.scss';
import clsx from 'clsx';
import React, { ComponentPropsWithRef, forwardRef, useState, useEffect } from 'react';
import { DropdownArrow } from '@/assets/index';

/**
 * SelectBox 컴포넌트의 props 타입 정의
 *
 * @typedef {Object} SelectBoxProps
 * @property {string} [label] - select 위에 표시될 라벨 텍스트
 * @property {Array<{value: string, label: string}>} options - 선택 옵션 목록 (필수)
 * @property {string} [helperText] - select 아래에 표시될 도움말 또는 에러 메시지
 * @property {boolean} [error=false] - true일 경우 에러 스타일 적용
 * @property {boolean} [fullWidth=false] - true일 경우 부모 요소의 전체 너비를 차지
 * @property {string} [placeholder] - 선택되지 않은 상태에서 표시될 placeholder 텍스트
 */

type SelectBoxProps = ComponentPropsWithRef<'select'> & {
  label?: string;
  options: Array<{ value: string; label: string }>;
  helperText?: string;
  error?: boolean;
  fullWidth?: boolean;
  placeholder?: string;
};

/**
 * 재사용 가능한 SelectBox 컴포넌트
 * 
 * @component
 * 
 * @description
 * label, options, helperText, error 상태를 지원하는 범용 select 컴포넌트입니다.
 * 기본 시스템 드롭다운을 사용하며, 선택 전에는 연한 회색, 선택 후에는 진한 검정색으로 표시됩니다.
 * 
 * @example
 * // 기본 사용 - 와인 타입 선택
 * const [wineType, setWineType] = useState('');
 * 
 *  const wineTypeOptions = [
    { value: 'red', label: 'Red' },
    { value: 'white', label: 'White' },
    { value: 'sparkling', label: 'Sparkling' },
  ];
 * 
 * <SelectBox 
 *   label="타입"
 *   placeholder="선택하세요"
 *   options={wineTypeOptions}
 *   value={wineType}
 *   onChange={(e) => setWineType(e.target.value)}
 * />
 * 
 * @example
 * // 비활성화 상태
 * <SelectBox 
 *   label="타입"
 *   placeholder="선택하세요"
 *   options={wineTypeOptions}
 *   value="red"
 *   disabled
 * />
 * 
 */

const SelectBox = forwardRef<HTMLSelectElement, SelectBoxProps>(
  (
    {
      label,
      options,
      helperText,
      error = false,
      fullWidth = false,
      placeholder,
      className,
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref,
  ) => {
    // 초기값 체크 (value 또는 defaultValue 기준)
    const initialValue = value !== undefined ? value : defaultValue;
    const [hasValue, setHasValue] = useState(initialValue !== undefined && initialValue !== '');

    // value가 외부에서 변경될 때마다 체크
    useEffect(() => {
      if (value !== undefined) {
        setHasValue(value !== '');
      }
    }, [value]);

    // onChange 핸들러
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newValue = e.target.value;
      setHasValue(newValue !== '');

      // 부모의 onChange 호출
      onChange?.(e);
    };

    return (
      <div
        className={clsx(styles.selectContainer, {
          [styles.fullWidth]: fullWidth,
        })}
      >
        {label && <label className={styles.label}>{label}</label>}
        <div className={styles.selectWrapper}>
          <select
            ref={ref}
            value={value}
            onChange={handleChange}
            className={clsx(
              styles.select,
              {
                [styles.error]: error,
                [styles.hasValue]: hasValue,
              },
              className,
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <img className={styles.chevronIcon} src={DropdownArrow.src} />
        </div>
        {helperText && (
          <p
            className={clsx(styles.helperText, {
              [styles.errorText]: error,
            })}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

SelectBox.displayName = 'SelectBox';

export default SelectBox;
