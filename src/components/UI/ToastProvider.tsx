import { Toaster } from 'react-hot-toast';
import type { ReactNode } from 'react';

interface ToastProviderProps {
    children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
    return (
        <>
            {children}
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 4000,
                    style: {
                        background: '#fff',
                        color: '#363636',
                        borderRadius: '12px',
                        padding: '16px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                        fontWeight: 500,
                    },
                    success: {
                        iconTheme: {
                            primary: '#22c55e',
                            secondary: '#fff',
                        },
                    },
                    error: {
                        iconTheme: {
                            primary: '#ef4444',
                            secondary: '#fff',
                        },
                    },
                }}
            />
        </>
    );
}