import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeContext, ThemeProvider } from './utils/theme/themeContext';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ThemeProvider initialTheme={'dark'}>
        <React.StrictMode>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </React.StrictMode>
    </ThemeProvider>
);
