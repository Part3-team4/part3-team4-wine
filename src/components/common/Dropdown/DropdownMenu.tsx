/**
 * Dropdown.Menu
 *
 * 드롭다운 메뉴 컨테이너.
 * 내부에 Dropdown.Item을 포함하며, 열림 상태(open)에 따라 표시 여부가 결정된다.
 *
 * @example
 * <Dropdown.Menu>
 *   <Dropdown.Item>수정하기</Dropdown.Item>
 *   <Dropdown.Item>삭제하기</Dropdown.Item>
 * </Dropdown.Menu>
 *
 * @property {boolean} [open] - 메뉴 열림 여부(컨텍스트에 의해 자동 관리될 수 있음)
 */

'use client';

import { ReactNode } from 'react';
import { useDropdown } from './Dropdown';
import styles from './Dropdown.module.scss';

interface MenuProps {
  children: ReactNode;
}

export default function DropdownMenu({ children }: MenuProps) {
  const { open } = useDropdown();

  if (!open) return null;

  return <div className={styles.menu}>{children}</div>;
}
