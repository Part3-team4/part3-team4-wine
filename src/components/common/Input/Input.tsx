import styles from '@/components/common/Input/Input.module.scss';

/**
 * Input 컴포넌트의 Props 인터페이스
 */
interface InputProps {
  /** 입력 필드의 라벨 텍스트 */
  label: string;
  /** 입력 필드의 타입
   * @default 'text'
   */
  type?: 'text' | 'email' | 'password';
  /** 입력 필드의 placeholder 텍스트 */
  placeholder?: string;
  /** 입력 필드의 현재 값 */
  value: string;
  /** 입력 값이 변경될 때 호출되는 콜백 함수 */
  onChange: (value: string) => void;
  /** 입력 필드 아래에 표시될 도움말 또는 오류 메시지 */
  helperText?: string;
  /** 오류 상태 여부 (true일 경우 오류 스타일 적용)
   * @default false
   */
  error?: boolean;
  /** 입력 필드 비활성화 여부
   * @default false
   */
  disabled?: boolean;
}

/**
 * 재사용 가능한 Input 컴포넌트
 * 라벨, 도움말 텍스트, 오류 상태를 포함한 완전한 입력 필드를 제공합니다.
 *
 * @example
 * ```tsx
 * // 기본 사용
 * <Input
 *   label="이름"
 *   value={name}
 *   onChange={setName}
 *   placeholder="이름을 입력하세요"
 * />
 *
 * // 이메일 입력
 * <Input
 *   label="이메일"
 *   type="email"
 *   value={email}
 *   onChange={setEmail}
 *   helperText="이메일 형식으로 작성해 주세요"
 * />
 *
 * // 오류 상태
 * <Input
 *   label="비밀번호"
 *   type="password"
 *   value={password}
 *   onChange={setPassword}
 *   error={true}
 *   helperText="비밀번호는 최소 8자 이상이어야 합니다"
 * />
 *
 * // 비활성화 상태
 * <Input
 *   label="사용자 ID"
 *   value={userId}
 *   onChange={setUserId}
 *   disabled={true}
 * />
 * ```
 *
 * @param props - Input 컴포넌트의 속성
 * @returns 렌더링된 입력 필드 엘리먼트
 */
function Input({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  helperText,
  error = false,
  disabled = false,
}: InputProps) {
  return (
    <div className={styles.inputContainer}>
      <label className={styles.label}>{label}</label>
      <input
        type={type}
        className={`${styles.input} ${error ? styles.error : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
      {helperText && (
        <p className={`${styles.helperText} ${error ? styles.errorText : ''}`}>{helperText}</p>
      )}
    </div>
  );
}

export default Input;
