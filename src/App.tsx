import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { useAuthStore } from '@/store/authStore';
import { Spinner } from '@/components/UI/Spinner';
import { ToastProvider } from '@/components/UI/index';

export function App() {
  const isInitialized = useAuthStore(state => state.isInitialized);

  if (!isInitialized) {
    return <Spinner />;
  }

  return (
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  );
}