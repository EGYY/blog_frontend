import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { App } from './app/App';
import { ThemeProvider } from './app/providers/ThemeProvider';
import './shared/config/i18n/i18n';
import './app/styles/index.scss';
import { ErrorBoundary } from './app/providers/ErrorBoundary';
import { StoreProvider } from './app/providers/StoreProvider';
import { ToastProvider } from './app/providers/ToastProvieder';

render(
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
  document.getElementById('root'),
);
