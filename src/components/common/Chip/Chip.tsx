import styles from './Chip.module.scss';
import { ReactNode } from 'react';

interface ChipProps {
  children: ReactNode; // 메인 텍스트
  selected?: boolean; // 선택됨
  clickable?: boolean; // 클릭 가능여부
  onClick?: () => void; // 클릭 이벤트
}

export default function Chip({ children, clickable = false, selected, onClick }: ChipProps) {
  const Tag = clickable ? 'button' : 'span';

  return (
    <Tag
      className={`${styles.chip} ${selected ? styles.selected : ''}`}
      onClick={clickable ? onClick : undefined}
    >
      {children}
    </Tag>
  );
}
