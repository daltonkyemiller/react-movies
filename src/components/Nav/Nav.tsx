import React, { useEffect, useState } from 'react';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import SearchBar from '../SearchBar/SearchBar';
import { BiCameraMovie } from 'react-icons/all';
import { AnimatePresence, motion } from 'framer-motion';

type NavProps = {
    onSearch: (search: string) => void;
};

const Nav = ({ onSearch }: NavProps) => {
    const [searchOpen, setSearchOpen] = useState(false);
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === 'e') setSearchOpen((prev) => !prev);
        };
        document.addEventListener('keydown', onKeyDown);

        return () => document.removeEventListener('keydown', onKeyDown);
    }, []);
    return (
        <nav>
            <AnimatePresence>
                {searchOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.25 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 0.25 }}
                        className="absolute inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-xl"
                    >
                        <SearchBar onSearch={onSearch} />
                    </motion.div>
                )}
            </AnimatePresence>
            <ul className={`relative flex items-center justify-between py-4`}>
                <li className={`translate-x-[13%]`}>
                    {/*<SearchBar onSearch={onSearch} />*/}
                </li>
                <li>
                    <h1 className={`font-brand text-6xl font-bold lowercase`}>
                        mvie
                    </h1>
                </li>
                <li>{/*<ThemeSwitcher />*/}</li>
            </ul>
        </nav>
    );
};

export default Nav;
