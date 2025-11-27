import clsx from 'clsx';
import styles from './Radio.module.scss';

/**
 * 라디오 버튼 옵션의 데이터 구조
 * @interface RadioOption
 * @property {string} label - 사용자에게 보여질 텍스트
 * @property {string} value - 실제로 저장되고 전달되는 값
 */
export interface RadioOption {
  label: string;
  value: string;
}

/**
 * RadioFilter 컴포넌트의 Props
 * @interface RadioFilterProps
 * @property {string} [className] - 외부에서 추가할 CSS 클래스 (선택사항)
 * @property {string} [title] - 필터 제목 (선택사항, 예: "RATING", "CATEGORY", "PRICE")
 * @property {RadioOption[]} options - 렌더링할 옵션 배열
 * @property {string} selectedValue - 현재 선택된 옵션의 value 값
 * @property {function} onValueChange - 옵션 선택 시 호출되는 콜백 함수
 */
interface RadioFilterProps {
  className?: string;
  title?: string;
  options: RadioOption[];
  selectedValue: string;
  onValueChange: (value: string) => void;
}

/**
 * 범용 라디오 버튼 필터 컴포넌트
 *
 * 다양한 필터에서 재사용 가능한 라디오 버튼 그룹입니다.
 * 평점, 카테고리, 가격대 등 어떤 필터에도 사용할 수 있습니다.
 *
 * @component
 * @param {RadioFilterProps} props - 컴포넌트 속성
 * @returns {JSX.Element | null} 라디오 필터 UI (옵션이 없으면 null 반환)
 *
 * @example
 * // 평점 필터로 사용
 * function ProductFilter() {
 *   const [rating, setRating] = useState('all');
 *
 *   const ratingOptions = [
 *     { label: '전체', value: 'all' },
 *     { label: '4.5 - 5.0', value: '4_5To5_0' },
 *     { label: '4.0 - 4.5', value: '4_0To4_5' }
 *   ];
 *
 *   return (
 *     <RadioFilter
 *       title="RATING"
 *       options={ratingOptions}
 *       selectedValue={rating}
 *       onValueChange={setRating}
 *     />
 *   );
 * }
 *
 * @example
 * // 제목 없이 사용
 * function SimpleFilter() {
 *   const [sort, setSort] = useState('latest');
 *
 *   const sortOptions = [
 *     { label: '최신순', value: 'latest' },
 *     { label: '인기순', value: 'popular' }
 *   ];
 *
 *   return (
 *     <RadioFilter
 *       options={sortOptions}
 *       selectedValue={sort}
 *       onValueChange={setSort}
 *     />
 *   );
 * }
 */
export const RadioFilter = ({
  className,
  title,
  options,
  selectedValue,
  onValueChange,
}: RadioFilterProps) => {
  if (!options || options.length === 0) return null;

  return (
    <div className={clsx(styles.radioFilterContainer, className)}>
      {title && <h2 className={styles.filterTitle}>{title}</h2>}

      {options.map((option) => {
        const isSelected = selectedValue === option.value;
        const inputId = `radio-${option.value}`;

        return (
          <label key={option.value} htmlFor={inputId} className={styles.radioItem}>
            <input
              type="radio"
              id={inputId}
              name="radioGroup"
              value={option.value}
              checked={isSelected}
              onChange={() => onValueChange(option.value)}
              className={styles.hiddenInput}
            />

            <div className={clsx(styles.customRadio, { [styles.radioSelected]: isSelected })}>
              {isSelected && <div className={styles.radioDot} />}
            </div>

            <span className={clsx(styles.labelText, { [styles.labelSelected]: isSelected })}>
              {option.label}
            </span>
          </label>
        );
      })}
    </div>
  );
};
