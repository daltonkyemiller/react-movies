import React from 'react';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import SearchBar from '../SearchBar/SearchBar';
import { BiCameraMovie } from 'react-icons/all';

type NavProps = {
    onSearch: (search: string) => void;
};

const Nav = ({ onSearch }: NavProps) => {
    return (
        <nav>
            <ul className={`relative flex items-center justify-between py-4`}>
                <li className={`relative`}>
                    <a href="/" className={``}>
                        {/*<BiCameraMovie className={`text-5xl`} />*/}
                    </a>
                </li>
                <li>
                    <h1 className={`font-bold text-6xl font-brand lowercase`}>Movies App</h1>
                </li>
                {/*<li className={`translate-x-[13%]`}>*/}
                {/*    <SearchBar onSearch={onSearch} />*/}
                {/*</li>*/}
                <li>
                    <ThemeSwitcher />
                </li>
            </ul>
        </nav>
    );
};

export default Nav;
