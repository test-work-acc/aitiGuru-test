import { createBrowserRouter, Navigate } from 'react-router-dom';
import { LoginPage } from '@/pages/LoginPage';
import { ProductsPage } from '@/pages/ProductsPage';
import { useAuthStore } from '@/store/authStore';

function PrivateRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, isInitialized } = useAuthStore();

    if (!isInitialized) {
        return null;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, isInitialized } = useAuthStore();

    if (!isInitialized) {
        return null;
    }

    if (isAuthenticated) {
        return <Navigate to="/products" replace />;
    }

    return <>{children}</>;
}

export const router = createBrowserRouter([
    {
        path: '/login',
        element: (
            <PublicRoute>
                <LoginPage />
            </PublicRoute>
        ),
    },
    {
        path: '/products',
        element: (
            <PrivateRoute>
                <ProductsPage />
            </PrivateRoute>
        ),
    },
    {
        path: '/',
        element: <Navigate to="/login" replace />,
    },
    {
        path: '*',
        element: <Navigate to="/login" replace />,
    },
]);