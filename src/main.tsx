import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Toaster } from 'sonner';
import { store, persistor } from './app/store';
import { ThemeProvider } from './theme/theme-provider';
import { AppRoutes } from './routes';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <AppRoutes />
          <Toaster position="top-right" />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
