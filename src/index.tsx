import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { App } from './app/App';
import { ErrorBoundary } from './app/providers/ErrorBoundary';
import { StoreProvider } from './app/providers/StoreProvider';
import { ThemeProvider } from './app/providers/ThemeProvider';
import { ToastProvider } from './app/providers/ToastProvieder';

import './shared/config/i18n/i18n';
import './app/styles/index.scss';

const container = document.getElementById('root');

if (!container) {
  throw new Error('root container not found');
}

const root = createRoot(container);

root.render(
  <BrowserRouter>
    <StoreProvider>
      <ToastProvider>
        <ErrorBoundary>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </ErrorBoundary>
      </ToastProvider>
    </StoreProvider>
  </BrowserRouter>,
);
