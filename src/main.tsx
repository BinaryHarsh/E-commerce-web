
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Toaster } from 'sonner';
import { store, persistor } from './app/store';
import { ThemeProvider } from './theme/theme-provider';
import { AuthProvider } from './contexts/AuthContext';
import { AppRoutes } from './routes';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <AuthProvider>
            <AppRoutes />
            <Toaster position="top-center" />
          </AuthProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
);
