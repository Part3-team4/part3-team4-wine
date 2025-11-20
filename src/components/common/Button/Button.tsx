import styles from '@/components/common/Button/Button.module.scss';

/**
 * 버튼 컴포넌트의 Props 인터페이스
 */
interface ButtonProps {
  /** 버튼에 표시될 텍스트 */
  text: string;
  /** 버튼의 스타일 variant
   * @default 'filled'
   */
  variant?: 'filled' | 'tinted' | 'outlined' | 'subtle';
  /** 버튼의 크기
   * @default 'medium'
   */
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
  /** 버튼 왼쪽에 표시될 아이콘 (React 노드) */
  icon?: React.ReactNode;
  /** 버튼 클릭 시 실행될 콜백 함수 */
  onClick?: () => void;
  /** 버튼 비활성화 여부
   * @default false
   */
  disabled?: boolean;
  /** 버튼을 부모 요소의 전체 너비로 확장할지 여부
   * @default false
   */
  fullWidth?: boolean;
  /** 버튼의 모서리를 둥글게 처리할지 여부
   * @default false
   */
  rounded?: boolean;
}

/**
 * 재사용 가능한 버튼 컴포넌트
 *
 * @example
 * ```tsx
 * // 기본 사용
 * <Button text="확인" />
 *
 * // 아이콘이 있는 버튼
 * <Button text="저장" icon={<SaveIcon />} variant="filled" />
 *
 * // 전체 너비 버튼
 * <Button text="제출" fullWidth onClick={handleSubmit} />
 *
 * // 둥근 모서리의 작은 버튼
 * <Button text="취소" size="small" rounded variant="outlined" />
 * ```
 *
 * @param props - 버튼 컴포넌트의 속성
 * @returns 렌더링된 버튼 엘리먼트
 */
function Button({
  text,
  variant = 'filled',
  size = 'medium',
  icon,
  onClick,
  disabled = false,
  fullWidth = false,
  rounded = false,
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${
        fullWidth ? styles.fullWidth : ''
      } ${rounded ? styles.rounded : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {text && <span className={styles.text}>{text}</span>}
    </button>
  );
}

export default Button;
