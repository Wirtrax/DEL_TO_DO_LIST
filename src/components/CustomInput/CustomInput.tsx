import React, { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';
import styles from './CustomInputStyle.module.css';

interface InputProps {
  label: string;
  placeholder?: string;
  error?: string | FieldError;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel';
  name?: string;
  id?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, error, value, onChange, type = 'text', className = '', label, ...props }, ref) => {
    return (
      <div className={`${styles.container} ${className}`}>
        <label className="form-check-label" htmlFor={label}>
          {label}
        </label>
        <input
          ref={ref}
          id={label}
          type={type}
          className={`${styles.input} ${error ? styles.inputError : ''}`}
          placeholder={placeholder}
          value={value || ''}
          onChange={onChange}
          {...props}
        />
        {error && typeof error === 'string' && <p className={styles.errorText}>{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
