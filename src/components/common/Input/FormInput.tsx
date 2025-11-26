import style from '@/components/common/Input/Input.module.scss';
import clsx from 'clsx';
import Input, { InputProps } from '@/components/common/Input/Input';

/**
 * FormInput 컴포넌트에서 사용할 props 타입.
 * - label: 인풋의 라벨 텍스트
 * - error: 에러 메시지
 * - 나머지는 InputProps를 모두 상속해 value, onChange 등을 그대로 사용 가능
 */
type FormInputProps = {
  label?: string;
  error?: string;
} & InputProps;

/**
 * 라벨, 에러 텍스트를 포함한 FormInput 컴포넌트.
 * 내부적으로 Input 컴포넌트를 사용하여
 * form에서 자주 사용하는 패턴을 통합합니다.
 */

/**
 * FormInput 컴포넌트에서 사용할 props 타입
 *
 * 사용 예시:
 *
 * <FormInput
 *   label="이메일"
 *   type="email"
 *   placeholder="example@gmail.com"
 *   value={email}
 *   onChange={(e) => setEmail(e.target.value)}
 *   error={emailError} // 에러 메시지가 있으면 input 아래 빨간색 텍스트 노출 + 테두리 red
 * />
 *
 */
export default function FormInput({ label, error, className, ...inputProps }: FormInputProps) {
  return (
    <div className={style.inputContainer}>
      {label && <label className={style.label}>{label}</label>}

      <Input {...inputProps} />

      {error && <p className={style.errorText}>{error}</p>}
    </div>
  );
}
