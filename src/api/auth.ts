import type { User } from '@/types/domain';
import axios from './client';

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    refreshToken: string;
    user: User;
    id: number;
}

export interface ApiError {
    message: string;
    status: number;
}


export async function loginApi(username: string, password: string): Promise<LoginResponse> {
    try {
        console.log('🔐 [API] Sending login request...', { username });

        const response = await axios.post<LoginResponse>('/auth/login', {
            username,
            password,
            expiresInMins: 60,
        });

        console.log('✅ [API] Login success:', response.data);
        return response.data;

    } catch (error: any) {
        // 🔍 Детальный лог ошибки
        console.error('❌ [API] Login failed:', {
            message: error.message,
            code: error.code,
            status: error.response?.status,
            data: error.response?.data,
            config: {
                url: error.config?.url,
                baseURL: error.config?.baseURL,
                method: error.config?.method,
            }
        });

        if (error.response) {
            throw {
                message: error.response.data?.message || 'Неверный логин или пароль',
                status: error.response.status,
            } as ApiError;
        }

        if (error.request) {
            throw {
                message: 'Нет соединения с сервером. Проверьте интернет.',
                status: 0,
            } as ApiError;
        }

        throw {
            message: error.message || 'Ошибка авторизации',
            status: 0,
        } as ApiError;
    }
}


export async function validateTokenApi(token: string): Promise<User> {
    const response = await axios.get<User>('/auth/me', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}


export function logoutApi(): void {
    localStorage.removeItem('auth_token');
    sessionStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    sessionStorage.removeItem('auth_user');
}