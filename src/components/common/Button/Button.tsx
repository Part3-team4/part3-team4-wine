import styles from '@/components/common/Button/Button.module.scss';

interface ButtonProps {
  text: string;
  variant?: 'filled' | 'tinted' | 'outlined' | 'subtle';
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  rounded?: boolean;
}

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
