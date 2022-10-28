import { motion } from 'framer-motion';
import React, { useRef } from 'react';
import { ImSearch } from 'react-icons/im';

type SeachBarProps = {
    onSearch: (search: string) => void;
    className?: string;
};

const SearchBar = ({ onSearch, className }: SeachBarProps) => {
    const [barOpen, setBarOpen] = React.useState(true);
    const barRef = useRef<HTMLInputElement>(null);

    const barVariants = {
        show: {
            opacity: 1,
            scaleX: 1,
        },
        hide: {
            opacity: 0,
            scaleX: 0,
        },
    };
    const iconVariants = {
        show: {
            left: '0%',
        },
        hide: {
            left: '50%',
        },
    };
    return (
        <div className={`relative z-50 flex items-center gap-2 ${className}`}>
            <motion.div
                variants={iconVariants}
                initial="hide"
                animate={barOpen ? 'show' : 'hide'}
                className={'relative'}
            >
                <ImSearch
                    onClick={() => {
                        if (barOpen) {
                            onSearch(barRef.current?.value!);
                        }
                        setBarOpen(!barOpen);
                        barRef.current?.focus();
                    }}
                    className={`cursor-pointer text-3xl transition-all hover:scale-125`}
                />
            </motion.div>
            <motion.input
                autoFocus
                ref={barRef}
                className={`h-10 origin-left rounded-md bg-neutral-900 p-3 text-neutral-50 text-neutral-50 outline-none dark:bg-neutral-50 dark:text-neutral-900`}
                type="text"
                variants={barVariants}
                initial="hide"
                animate={barOpen ? 'show' : 'hide'}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        onSearch((e.target as HTMLInputElement).value);
                    }
                }}
            />
        </div>
    );
};

export default SearchBar;
