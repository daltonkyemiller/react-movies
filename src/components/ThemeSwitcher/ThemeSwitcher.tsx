import React, { useContext } from 'react';
import { ThemeContext } from '../../utils/theme/themeContext';

type ThemeSwitcherProps = {};

const ThemeSwitcher = ({}: ThemeSwitcherProps) => {
    const theme = useContext(ThemeContext);
    return (
        <div className={`absolute right-4 top-5 z-50  font-bold`}>
            <button onClick={() => theme.toggleTheme!()}>
                Switch to {theme.theme === 'dark' ? 'Light' : 'Dark'} Mode
            </button>
        </div>
    );
};

export default ThemeSwitcher;
