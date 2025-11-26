import React, { useState } from 'react';
import styles from './Radio.module.scss'; 

interface RatingOption {
  label: string;
  value: string;
}

interface RatingRadioProps {
  label: string;
  value: string;
  isSelected: boolean;
  onSelect: (value: string) => void;
}

type RatingRadioFilterProps = {};

// 평점 옵션 데이터
const RATING_OPTIONS: RatingOption[] = [
  { label: '전체', value: 'all' },
  { label: '4.5 - 5.0', value: '4_5To5_0' },
  { label: '4.0 - 4.5', value: '4_0To4_5' },
  { label: '3.5 - 4.0', value: '3_5To4_0' },
  { label: '3.0 - 3.5', value: '3_0To3_5' },
];

/**
 * 개별 라디오 버튼 항목 (단일 선택)
 */
const RatingRadio: React.FC<RatingRadioProps> = ({ label, isSelected, onSelect, value }) => {
  
  const radioClasses = `${styles.customRadio} ${isSelected ? styles.radioSelected : ''}`;
  const labelClasses = `${styles.labelText} ${isSelected ? styles.labelSelected : ''}`;

  return (
    <div 
      className={styles.ratingItem} 
      onClick={() => onSelect(value)}
    >
      {/* 커스텀 라디오 버튼 UI 영역 */}
      <div className={radioClasses}>
        {isSelected && <div className={styles.radioDot} />} // styles.camelCase
      </div>

      {/* 라벨 텍스트 */}
      <span className={labelClasses}>
        {label}
      </span>
      
      {/* 실제 라디오 입력 필드 (접근성/폼 제출용) */}
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

/**
 * 평점 필터 전체 그룹을 관리하는 컴포넌트
 */
export const RatingRadioFilter: React.FC<RatingRadioFilterProps> = () => {
  const [selectedRating, setSelectedRating] = useState<string>('4_0To4_5'); 

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