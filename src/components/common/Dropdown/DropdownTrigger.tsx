/**
 * Dropdown.Trigger
 *
 * 드롭다운을 열고 닫는 트리거 역할.
 * 보통 버튼 기반으로 사용하며 클릭 시 메뉴의 열림 상태를 제어한다.
 *
 * @example
 * <Dropdown.Trigger>
 *   text, component, Image
 * </Dropdown.Trigger>
 *
 * @property {boolean} [toggle] - 메뉴 열림 여부(컨텍스트에 의해 자동 관리될 수 있음)
 */

'use client';

import { ReactNode } from 'react';
import { useDropdown } from './Dropdown';
import styles from './Dropdown.module.scss';

interface TriggerProps {
  children: ReactNode;
}

export default function DropdownTrigger({ children }: TriggerProps) {
  const { toggle } = useDropdown();
  return (
    <button className={styles.trigger} onClick={toggle}>
      {children}
    </button>
  );
}
