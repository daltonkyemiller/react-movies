import React, { useContext } from 'react';
import { ThemeContext } from '../../context/theme/themeContext';

type ThemeSwitcherProps = {};

const ThemeSwitcher = ({}: ThemeSwitcherProps) => {
    const theme = useContext(ThemeContext);
    return (
        <div className={` font-bold`}>
            <button onClick={() => theme.toggleTheme!()}>
                {theme.theme === 'dark' ? 'Light' : 'Dark'} Mode
            </button>
        </div>
    );
};

export default ThemeSwitcher;
