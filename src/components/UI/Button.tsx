import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { clsx } from 'clsx';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    isLoading?: boolean;
    fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', isLoading, fullWidth, children, disabled, ...props }, ref) => {
        const baseStyles = 'inline-flex items-center justify-center px-4 py-2.5 rounded-xl font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

        const variants = {
            primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
            secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-900 focus:ring-gray-500',
            danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
            ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-gray-500',
        };

        return (
            <button
                ref={ref}
                className={clsx(baseStyles, variants[variant], fullWidth ? 'w-full' : '', className)}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading ? (
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                ) : children}
            </button>
        );
    }
);

Button.displayName = 'Button';