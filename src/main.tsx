import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeContext, ThemeProvider } from './context/theme/themeContext';
import { MovieListProvider } from './context/movieListContext';
import { ModalProvider } from './context/modalContext';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ThemeProvider>
        <MovieListProvider>
            <ModalProvider>
                <React.StrictMode>
                    <QueryClientProvider client={queryClient}>
                        <App />
                    </QueryClientProvider>
                </React.StrictMode>
            </ModalProvider>
        </MovieListProvider>
    </ThemeProvider>
);
