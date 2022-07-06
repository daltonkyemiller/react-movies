import {
    createContext,
    PropsWithChildren,
    ReactElement,
    useEffect,
    useState,
} from 'react';

type Theme = {
    theme: string;
    setTheme?: (theme: string) => void;
    toggleTheme?: () => void;
};

export const ThemeContext = createContext<Theme>({ theme: 'light' });

type ThemeProviderProps = {
    initialTheme: 'dark' | 'light';
};
export const ThemeProvider = ({
    initialTheme,
    children,
}: PropsWithChildren<ThemeProviderProps>) => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };
    const _setTheme = (theme: string) => {
        const root = window.document.documentElement;
        const isDark = theme === 'dark';

        root.classList.remove(isDark ? 'light' : 'dark');
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    };

    if (initialTheme) _setTheme(initialTheme);

    useEffect(() => {
        _setTheme(theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
