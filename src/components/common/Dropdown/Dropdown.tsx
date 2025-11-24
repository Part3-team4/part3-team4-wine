/**
 * Dropdown의 설명은 index.ts에서 확인
 */

'use client';

import { createContext, useState, useContext, ReactNode } from 'react';
import styles from './Dropdown.module.scss';

interface DropdownContextType {
  open: boolean;
  toggle: () => void;
  close: () => void;
  onSelect: (value: string) => void;
}

const DropdownContext = createContext<DropdownContextType | null>(null);

export function useDropdown() {
  const ctx = useContext(DropdownContext);
  if (!ctx) throw new Error('Dropdown compound components must be used inside <Dropdown>');
  return ctx;
}

interface DropdownProps {
  children: ReactNode;
  onChange?: (value: string) => void;
}

export default function Dropdown({ children, onChange }: DropdownProps) {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);

  const onSelect = (value: string) => {
    onChange?.(value);
    close();
  };

  return (
    <DropdownContext.Provider value={{ open, toggle, close, onSelect }}>
      <div className={styles.wrapper}>{children}</div>
    </DropdownContext.Provider>
  );
}
