import React, { useState } from 'react';
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

// RatingRadioFilter 컴포넌트 Props
type RatingRadioFilterProps = {};

// 평점 옵션 데이터
const RATING_OPTIONS: RatingOption[] = [
  { label: '전체', value: 'all' },
  { label: '4.5 - 5.0', value: '4_5To5_0' },
  { label: '4.0 - 4.5', value: '4_0To4_5' },
  { label: '3.5 - 4.0', value: '3_5To4_0' },
  { label: '3.0 - 3.5', value: '3_0To3_5' },
];

// --- 2. RatingRadio Component ---

/**
 * 개별 라디오 버튼 항목을 렌더링하는 컴포넌트입니다.
 * 여러 옵션 중 단 하나만 선택 가능하도록 제어됩니다.
 * * @param {RatingRadioProps} props - 컴포넌트 속성
 * @returns {JSX.Element} 렌더링된 라디오 버튼 항목
 */
const RatingRadio: React.FC<RatingRadioProps> = ({ label, isSelected, onSelect, value }) => {
  
  // CSS Module 클래스 조합
  const radioClasses = `${styles.customRadio} ${isSelected ? styles.radioSelected : ''}`;
  const labelClasses = `${styles.labelText} ${isSelected ? styles.labelSelected : ''}`;

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

/**
 * 평점 필터 전체 그룹을 관리하는 메인 컴포넌트입니다.
 * 내부 상태를 통해 단일 선택 기능을 제어합니다.
 * * @returns {JSX.Element} 평점 필터 목록
 */
export const RatingRadioFilter: React.FC<RatingRadioFilterProps> = () => {
  // 상태 관리: 단일 값(string) 저장
  const [selectedRating, setSelectedRating] = useState<string>('4_0To4_5'); 

  /**
   * 라디오 버튼 선택 시 호출되는 핸들러입니다.
   * @param {string} value - 선택된 라디오 버튼의 고유 값.
   */
  const handleRadioSelect = (value: string) => {
    setSelectedRating(value);
  };

  return (
    <div 
      className={styles.ratingFilterContainer} 
      style={{ 
        padding: '20px', 
        width: '250px', 
        backgroundColor: '#fff',
      }}
    >
      <h2 style={{ color: '#333', fontSize: '20px', marginBottom: '15px', fontWeight: 'bold' }}>RATING</h2>
      
      {RATING_OPTIONS.map((option) => (
        <RatingRadio
          key={option.value}
          label={option.label}
          value={option.value}
          isSelected={selectedRating === option.value} 
          onSelect={handleRadioSelect}
        />
      ))}
    </div>
  );
};