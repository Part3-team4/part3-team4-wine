/**
 * 향(aroma) 칩을 리스트 형태로 보여주는 컴포넌트
 *
 * - 기본 모드와 클릭 모드를 지원합니다.
 * - `clickable`이 true면 칩을 클릭해서 선택/해제할 수 있고,
 *   선택된 칩은 `selected` 스타일이 적용됩니다.
 * - `defaultSelected`는 초기 선택 상태를 제어합니다.
 *
 * @prop {string[]} [defaultSelected] – 초기 선택될 향 리스트 (영문 코드 기준)
 * @prop {boolean} [clickable] – 클릭 가능 여부 (선택 모드 on/off)
 *
 * @example
 * // 기본 모드 (선택 불가)
 * <AromaChipList
 *  defaultSelected={["CHERRY", "BERRY"] // 배열 삽입}
 * />
 *
 * @example
 * // 클릭 가능한 모드 + 기본 선택값 존재
 * <AromaChipList
 *   clickable
 *   defaultSelected={["CHERRY", "BERRY"] // 배열 삽입}
 * />
 */

'use client';

import Chip from '@/components/common/Chip/Chip';
import { AROMA_EN, AROMA_KO, AromaType } from '@/constants/aroma';
import { useEffect, useState } from 'react';
import styles from './AromaChipList.module.scss';

interface AromaChipListProps {
  defaultSelected?: string[];
  clickable?: boolean;
  onChange?: (selected: string[]) => void;
}

export default function AromaChipList({
  defaultSelected = [],
  clickable = false,
  onChange,
}: AromaChipListProps) {
  const [selectedList, setSelectedList] = useState<string[]>(defaultSelected);

  // ✅ selectedList가 바뀔 때만 부모에게 알려주기
  useEffect(() => {
    onChange?.(selectedList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedList]);

  const toggle = (label: string) => {
    if (!clickable) return;

    setSelectedList((prev) =>
      prev.includes(label) ? prev.filter((v) => v !== label) : [...prev, label],
    );
  };

  const aromaList = Object.values(AROMA_EN);

  return (
    <ul className={styles.aromaChipList}>
      {aromaList.map((label) => (
        <li key={label}>
          <Chip
            selected={selectedList.includes(label)}
            onClick={() => toggle(label)}
            clickable={clickable}
          >
            {AROMA_KO[label]}
          </Chip>
        </li>
      ))}
    </ul>
  );
}
