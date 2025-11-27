import React, { useState } from 'react';
import clsx from 'clsx'; 
import styles from './Radio.module.scss'; 

// --- 1. 타입 및 데이터 정의 ---

/**
 * 평점 옵션 항목의 구조를 정의합니다.
 */
interface RatingOption {
  label: string;
  value: string;
}

/**
 * RatingRadio 컴포넌트의 Props를 정의합니다.
 * @property {string} label - 라디오 버튼 옆에 표시될 텍스트입니다.
 * @property {string} value - 해당 라디오 버튼의 고유 값입니다.
 * @property {boolean} isSelected - 현재 버튼이 선택되었는지 여부입니다.
 * @property {(value: string) => void} onSelect - 버튼 클릭 시 호출되며, 선택된 value를 인수로 전달합니다.
 */
interface RatingRadioProps {
  label: string;
  value: string;
  isSelected: boolean;
  onSelect: (value: string) => void;
}

/**
 * RatingRadioFilter 컴포넌트의 Props를 정의합니다.
 * @property {string} [className] - 외부에서 스타일 확장을 위해 전달하는 추가 클래스 이름입니다.
 * @property {RatingOption[]} options - 렌더링할 평점 옵션 목록입니다.
 * @property {string} selectedValue - 현재 선택된 옵션의 value입니다.
 * @property {(value: string) => void} onValueChange - 선택된 값이 변경될 때 호출되는 콜백 함수입니다.
 */
interface RatingRadioFilterProps {
    className?: string;
    options: RatingOption[];
    selectedValue: string;
    onValueChange: (value: string) => void;
}

// --- 2. RatingRadio Component ---

/**
 * 개별 라디오 버튼 항목을 렌더링하는 컴포넌트입니다.
 * 여러 옵션 중 단 하나만 선택 가능하도록 제어됩니다.
 * * @param {RatingRadioProps} props - 컴포넌트 속성
 * @returns {JSX.Element} 렌더링된 라디오 버튼 항목
 */
const RatingRadio = ({ label, isSelected, onSelect, value }: RatingRadioProps) => { 
  
  const radioClasses = clsx(
    styles.customRadio, 
    { [styles.radioSelected]: isSelected } 
  );

  const labelClasses = clsx(
    styles.labelText, 
    { [styles.labelSelected]: isSelected } 
  );

  return (
    <div 
      className={styles.ratingItem} 
      onClick={() => onSelect(value)}
    >
      {/* UI 및 로직 생략 */}
      <div className={radioClasses}>
        {isSelected && <div className={styles.radioDot} />}
      </div>
      <span className={labelClasses}>
        {label}
      </span>
      <input
        type="radio"
        name="ratingGroup" 
        value={value}
        checked={isSelected}
        readOnly
        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
      />
    </div>
  );
};

// --- 3. RatingRadioFilter Component ---

// 평점 옵션 데이터 (이 데이터는 공통 컴포넌트 내부에서 제거하고 props로 받도록 수정했습니다.)
const DUMMY_RATING_OPTIONS: RatingOption[] = [
    { label: '전체', value: 'all' },
    { label: '4.5 - 5.0', value: '4_5To5_0' },
    { label: '4.0 - 4.5', value: '4_0To4_5' },
    { label: '3.5 - 4.0', value: '3_5To4_0' },
    { label: '3.0 - 3.5', value: '3_0To3_5' },
];

/**
 * [공용 컴포넌트] 평점 필터 전체 그룹을 렌더링합니다.
 * 순수하게 목록을 표시하고 선택 상태를 관리하는 UI 역할만 합니다.
 * * @param {RatingRadioFilterProps} props - 컴포넌트 속성
 * @returns {JSX.Element} 평점 필터 목록
 */
export const RatingRadioFilter = ({ className, options, selectedValue, onValueChange }: RatingRadioFilterProps) => {

  
    return (
        <div 
            className={clsx(styles.ratingFilterContainer, className)} 
            style={{ 
            }}
        >
            <h2 className={styles.filterTitle}>RATING</h2>
            
            {options.map((option) => (
                <RatingRadio
                    key={option.value}
                    label={option.label}
                    value={option.value}
                    isSelected={selectedValue === option.value} 
                    onSelect={onValueChange}
                />
            ))}
        </div>
    );
};