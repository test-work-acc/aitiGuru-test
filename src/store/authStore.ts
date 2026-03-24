import { create } from 'zustand';
import type { User } from '@/types/domain';

interface AuthState {
    token: string | null;
    user: User | null;
    isAuthenticated: boolean;
    isInitialized: boolean;
    setAuth: (data: { token: string; user: User; rememberMe: boolean }) => void;
    logout: () => void;
}

const STORAGE = {
    TOKEN: 'auth_token',
    USER: 'auth_user',
};

const storedToken = localStorage.getItem(STORAGE.TOKEN) || sessionStorage.getItem(STORAGE.TOKEN);
let storedUser: User | null = null;

try {
    const userStr = localStorage.getItem(STORAGE.USER) || sessionStorage.getItem(STORAGE.USER);
    storedUser = userStr ? JSON.parse(userStr) : null;
} catch {
    localStorage.removeItem(STORAGE.TOKEN);
    localStorage.removeItem(STORAGE.USER);
    sessionStorage.removeItem(STORAGE.TOKEN);
    sessionStorage.removeItem(STORAGE.USER);
}

export const useAuthStore = create<AuthState>(() => ({
    token: storedToken,
    user: storedUser,
    isAuthenticated: !!storedToken,
    isInitialized: true,

    setAuth: ({ token, user, rememberMe }) => {
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem(STORAGE.TOKEN, token);
        storage.setItem(STORAGE.USER, JSON.stringify(user));

        useAuthStore.setState({ token, user, isAuthenticated: true });
    },

    logout: () => {
        localStorage.removeItem(STORAGE.TOKEN);
        localStorage.removeItem(STORAGE.USER);
        sessionStorage.removeItem(STORAGE.TOKEN);
        sessionStorage.removeItem(STORAGE.USER);

        useAuthStore.setState({
            token: null,
            user: null,
            isAuthenticated: false,
        });
    },
}));