import { createContext, PropsWithChildren, useEffect, useState } from 'react';

type Theme = {
    theme: string;
    setTheme?: (theme: string) => void;
    toggleTheme?: () => void;
};

export const ThemeContext = createContext<Theme>({
    theme: 'light',
});

type ThemeProviderProps = {};
export const ThemeProvider = ({
    children,
}: PropsWithChildren<ThemeProviderProps>) => {
    const userSetTheme = localStorage.getItem('theme');
    let initialTheme;
    if (!userSetTheme) {
        initialTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light';
    } else {
        initialTheme = userSetTheme;
    }

    const [theme, setTheme] = useState(initialTheme);

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

    useEffect(() => {
        console.log(localStorage.getItem('theme'));
        _setTheme(theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
