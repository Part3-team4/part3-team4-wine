import styles from '@/components/common/Input/Input.module.scss';
import clsx from 'clsx';
import React, { ComponentPropsWithRef, forwardRef } from 'react';

type InputProps = ComponentPropsWithRef<'input'> & {
  label?: string;
  helperText?: string;
  error?: boolean;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, helperText, error = false, className, ...props }, ref) => {
    return (
      <div className={styles.inputContainer}>
        {label && <label className={styles.label}>{label}</label>}
        <input
          ref={ref}
          className={clsx(
            styles.input,
            {
              [styles.error]: error,
            },
            className,
          )}
          {...props}
        />
        {helperText && (
          <p
            className={clsx(styles.helperText, {
              [styles.errorText]: error,
            })}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
