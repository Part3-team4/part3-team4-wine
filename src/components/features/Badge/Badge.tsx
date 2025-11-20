/**
 * @prop {ReactNode} prefix - 앞에 표시될 아이콘 또는 문자
 * @prop {ReactNode} children - 배지 안의 메인 텍스트
 * @prop {ReactNode} className - 별도의 클래스 네임이 필요할 때 사용
 *
 * @example
 *
 * 아이콘 필요시 prefix에 원하는 아이콘을 넣는다. (텍스트)
 * <Badge prefix="₩">89,900</Badge>
 *
 * svg는 컴포넌트 형식으로 넣는다.
 * <Badge prefix={<Star />} className="bg-rating">4.8</Badge>
 *
 * 일반적인 뱃지 케이스
 * <Badge>일반</Badge>
 */

import { ReactNode } from 'react';
import styles from './Badge.module.scss';

interface BadgeProps {
  prefix?: ReactNode; // 앞에 들어갈 아이콘/문자
  children: ReactNode; // 메인 텍스트
  className?: string; // 필요 시 추가 스타일
}

export default function Badge({ prefix, children, className }: BadgeProps) {
  return (
    <span className={`${styles.badge} ${className ?? ''}`}>
      {prefix && <span className={styles.badgePrefix}>{prefix}</span>}
      <span>{children}</span>
    </span>
  );
}
