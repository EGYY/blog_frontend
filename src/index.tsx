import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './app/App';
import { ThemeProvider } from './app/providers/ThemeProvider';
import './shared/config/i18n/i18n';
import './app/styles/index.scss';
import { StoreProvider } from './app/providers/StoreProvider';
import { ToastProvider } from './app/providers/ToastProvieder';
import { ErrorBoundary } from './app/providers/ErrorBoundary';

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
