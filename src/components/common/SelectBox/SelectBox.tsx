/**
 * 재사용 가능한 SelectBox 컴포넌트
 *
 * - Dropdown을 기반으로 선택 UI를 제공합니다.
 * - 항목을 선택하면 내부 상태가 업데이트되고,
 *   `onChange`가 전달된 경우 외부로 선택값이 전달됩니다.
 *
 * @component
 *
 * @param {Object[]} options - 선택 가능한 옵션 리스트
 * @param {string} options[].label - 화면에 표시되는 텍스트
 * @param {string} options[].value - 실제 값
 * @param {string} [placeholder='선택하세요'] - 선택 전 표시되는 기본 문구
 * @param {(value: string) => void} [onChange] - 선택된 값을 외부로 전달하는 콜백
 *
 * @example
 * // 단일 SelectBox 사용 예시
 * <SelectBox
 *   options={[
 *     { label: '체리', value: 'CHERRY' },
 *     { label: '베리', value: 'BERRY' },
 *     { label: '오크', value: 'OAK' },
 *   ]}
 * />
 *
 * @example
 * // 선택값을 상태로 관리하는 경우
 * const [value, setValue] = useState('');
 *
 * <SelectBox
 *   options={[
 *     { label: '체리', value: 'CHERRY' },
 *     { label: '베리', value: 'BERRY' },
 *     { label: '오크', value: 'OAK' },
 *   ]}
 *   onChange={(v) => setValue(v)}
 * />
 */

'use client';

import { useState } from 'react';
import Dropdown from '@/components/common/Dropdown';
import styles from './SelectBox.module.scss';
import Image from 'next/image';
import { DropdownArrow } from '@/assets';

interface Option {
  label: string;
  value: string;
}

interface SelectBoxProps {
  label: string;
  options: Option[];
  placeholder?: string;
  onChange?: (value: string) => void;
}

export default function SelectBox({
  label,
  options,
  placeholder = '선택하세요',
  onChange,
}: SelectBoxProps) {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const handleChange = (value: string) => {
    setSelectedValue(value);
    onChange?.(value);
  };

  const selectedLabel = options.find((v) => v.value === selectedValue)?.label;

  return (
    <div className={styles.selectbox}>
      {label && <label className={styles.label}>{label}</label>}

      <Dropdown onChange={handleChange}>
        <Dropdown.Trigger>
          <span className={selectedValue ? styles.selected : styles.placeholder}>
            {selectedValue ? selectedLabel : placeholder}
          </span>
          <Image src={DropdownArrow} alt="select box 화살표" width={24} height={24} />
        </Dropdown.Trigger>

        <div className={styles.menu}>
          <Dropdown.Menu>
            {options.map((o) => (
              <Dropdown.Item key={o.value} value={o.value}>
                <button>{o.label}</button>
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </div>
      </Dropdown>
    </div>
  );
}
