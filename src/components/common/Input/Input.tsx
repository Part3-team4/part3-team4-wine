import styles from '@/components/common/Input/Input.module.scss';

interface InputProps {
  label: string;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  helperText?: string;
  error?: boolean;
  disabled?: boolean;
}

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
