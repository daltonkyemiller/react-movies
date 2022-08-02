import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeContext, ThemeProvider } from './utils/theme/themeContext';
import { MovieListProvider } from './context/movieListContext';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ThemeProvider>
        <MovieListProvider>
            <React.StrictMode>
                <QueryClientProvider client={queryClient}>
                    <App />
                </QueryClientProvider>
            </React.StrictMode>
        </MovieListProvider>
    </ThemeProvider>
);
