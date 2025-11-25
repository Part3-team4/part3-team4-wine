/**
 * 클릭 유무를 지원하는 Chip 컴포넌트입니다.
 *
 * - `clickable`이 true일 때 버튼 역할을 하며 클릭 이벤트를 받을 수 있습니다.
 * - 선택된 칩은 `selected` 속성을 통해 스타일이 변경됩니다.
 * - 부모 컴포넌트는 `onClick` 콜백을 통해 선택 변화를 감지할 수 있습니다.
 *
 * @prop {ReactNode} children – 칩 내부에 표시될 텍스트 또는 요소
 * @prop {boolean} [selected] – 선택 여부(스타일 변경)
 * @prop {boolean} [clickable] – 클릭 가능한 칩 여부 (기본값: false)
 * @prop {() => void} [onClick] – 클릭 시 실행되는 콜백 함수 (`clickable`일 때만 동작)
 *
 * @example
 * // 기본 칩
 * <Chip>기본 칩</Chip>
 *
 *  @example
 * // 기본 칩 (선택 된 상태)
 * <Chip selected={true}>기본 칩</Chip>
 *
 * @example
 * // 클릭 가능한 칩
 * <Chip
 *   clickable
 *   selected={true} // true 는 선택된 상태, false는 선택되지 않은 상태
 *   onClick={() => console.log("칩 선택됨")}
 * >
 *   선택 칩
 * </Chip>
 */

import { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Chip.module.scss';

interface ChipProps {
  children: ReactNode;
  selected?: boolean;
  clickable?: boolean;
  onClick?: () => void;
}

export default function Chip({ children, clickable = false, selected, onClick }: ChipProps) {
  const Tag = clickable ? 'button' : 'span';

  return (
    <Tag
      className={clsx(styles.chip, selected && styles.selected)}
      onClick={clickable ? onClick : undefined}
    >
      {children}
    </Tag>
  );
}
