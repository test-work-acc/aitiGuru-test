import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Button } from '@/components/UI/index';
import { useAuthStore } from '@/store/authStore';
import { loginApi, type ApiError } from '@/api/auth';
import { User, X, Lock, Eye, EyeOff, LogIn } from 'lucide-react';

const loginSchema = z.object({
    username: z.string().min(1, 'Логин обязателен'),
    password: z.string().min(1, 'Пароль обязателен'),
    rememberMe: z.boolean(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
    const navigate = useNavigate();
    const { setAuth } = useAuthStore();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: '',
            password: '',
            rememberMe: false,
        },
    });

    const onSubmit = async (data: LoginFormValues) => {
        setIsLoading(true);
        try {
            const response = await loginApi(data.username, data.password);

            setAuth({
                token: response.token,
                user: response.user,
                rememberMe: data.rememberMe,
            });

            toast.success('Успешный вход!');
            navigate('/products');
        } catch (error) {
            const message = (error as ApiError).message || 'Ошибка авторизации';
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
            <div className="flex justify-center mb-6">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                    <LogIn className="w-6 h-6 text-gray-700" />
                </div>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 text-center mb-1">
                Добро пожаловать!
            </h1>
            <p className="text-gray-400 text-center mb-8">
                Пожалуйста, авторизуйтесь
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                        <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-gray-700">
                                Логин
                            </label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <User className="w-5 h-5" />
                                </div>
                                <input
                                    {...field}
                                    type="text"
                                    placeholder="test"
                                    className={`w-full pl-10 pr-10 py-2.5 rounded-xl border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${errors.username ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                                        }`}
                                />
                                {field.value && (
                                    <button
                                        type="button"
                                        onClick={() => field.onChange('')}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                        aria-label="Очистить поле"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                            {errors.username && (
                                <p className="text-sm text-red-600">{errors.username.message}</p>
                            )}
                        </div>
                    )}
                />

                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-gray-700">
                                Пароль
                            </label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <input
                                    {...field}
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••••"
                                    className={`w-full pl-10 pr-10 py-2.5 rounded-xl border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${errors.password ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                                        }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-sm text-red-600">{errors.password.message}</p>
                            )}
                        </div>
                    )}
                />

                <Controller
                    name="rememberMe"
                    control={control}
                    render={({ field }) => (
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={field.value ?? false}
                                onChange={(e) => field.onChange(e.target.checked)}
                                onBlur={field.onBlur}
                                name={field.name}
                                ref={field.ref}
                                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-500">Запомнить данные</span>
                        </label>
                    )}
                />

                <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    isLoading={isLoading}
                    className="py-3 text-base"
                >
                    Войти
                </Button>
            </form>

            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-400">или</span>
                </div>
            </div>

            <p className="text-center text-gray-500">
                Нет аккаунта?{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                    Создать
                </a>
            </p>
        </div>
    );
}