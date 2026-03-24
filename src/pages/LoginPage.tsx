import { LoginForm } from '@/components/auth/LoginForm';

export function LoginPage() {
    return (
        <div className="min-h-screen bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
            <LoginForm />
        </div>
    );
}