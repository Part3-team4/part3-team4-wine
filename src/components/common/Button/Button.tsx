import styles from '@/components/common/Button/Button.module.scss';
import clsx from 'clsx';
import React, { ComponentPropsWithRef, forwardRef } from 'react';

type ButtonProps = ComponentPropsWithRef<'button'> & {
  variant?: 'filled' | 'tinted' | 'outlined' | 'subtle';
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
  icon?: React.ReactNode;
  fullWidth?: boolean;
  rounded?: boolean;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'filled',
      size = 'medium',
      icon,
      fullWidth = false,
      rounded = false,
      children,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={clsx(
          styles.button,
          styles[variant],
          styles[size],
          {
            [styles.fullWidth]: fullWidth,
            [styles.rounded]: rounded,
          },
          className,
        )}
        {...props}
      >
        {icon && <span className={styles.icon}>{icon}</span>}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
