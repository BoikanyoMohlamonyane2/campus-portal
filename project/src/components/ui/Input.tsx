import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, helperText, error, leadingIcon, trailingIcon, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="label">
            {label}
          </label>
        )}
        
        <div className="relative">
          {leadingIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
              {leadingIcon}
            </div>
          )}
          
          <input
            id={inputId}
            className={cn(
              'input w-full',
              leadingIcon ? 'pl-10' : '',
              trailingIcon ? 'pr-10' : '',
              error ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : '',
              className
            )}
            ref={ref}
            {...props}
          />
          
          {trailingIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
              {trailingIcon}
            </div>
          )}
        </div>
        
        {(helperText || error) && (
          <p className={cn(
            'mt-1 text-sm',
            error ? 'text-error-500' : 'text-gray-500'
          )}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;