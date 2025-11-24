/**
 * Dropdown.Item
 *
 * 드롭다운에서 선택 가능한 개별 항목.
 * 클릭 시 특정 액션을 트리거하며, 상위 컴포넌트에서 onSelect 등을 통해 제어할 수 있다.
 *
 * @example
 * <Dropdown.Item onClick={handleEdit}>
 *   수정하기
 * </Dropdown.Item>
 *
 * @property {() => void} [onClick] - 항목 클릭 시 실행할 핸들러
 */

'use client';

import { ReactNode } from 'react';
import { useDropdown } from './Dropdown';
import styles from './Dropdown.module.scss';

interface ItemProps {
  value: string;
  children: ReactNode;
}

export default function DropdownItem({ value, children }: ItemProps) {
  const { onSelect } = useDropdown();

  return (
    <div className={styles.item} onClick={() => onSelect(value)}>
      {children}
    </div>
  );
}
