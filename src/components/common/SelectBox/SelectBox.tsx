import styles from '@/components/common/SelectBox/SelectBox.module.scss';
import clsx from 'clsx';
import React, { ComponentPropsWithRef, forwardRef, useState, useEffect } from 'react';
import { DropdownArrow } from '@/assets/index';

type SelectBoxProps = ComponentPropsWithRef<'select'> & {
  label?: string;
  options: Array<{ value: string; label: string }>;
  helperText?: string;
  error?: boolean;
  fullWidth?: boolean;
  placeholder?: string;
};

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
