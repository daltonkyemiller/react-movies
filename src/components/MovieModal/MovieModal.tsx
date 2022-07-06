import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { Movie } from '../../types/Movie';

type MovieModalProps = {
    movie: Movie;
};

const MovieModal = ({ movie }: MovieModalProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const variants = {
        show: {
            display: 'flex',
            opacity: 1,
        },
        hide: {
            opacity: 0,
            transitionEnd: {
                display: 'none',
            },
        },
    };
    return (
        <motion.div
            variants={variants}
            initial={`hide`}
            animate={isOpen ? 'show' : 'hide'}
            className={`absolute inset-24 z-[100] flex items-center justify-center overflow-clip p-5 backdrop-blur-xl`}
        >
            <button
                className={`absolute left-2 top-2 text-3xl`}
                onClick={() => setIsOpen(false)}
            >
                X
            </button>

            {/*Movie Content*/}
            <div className={'flex items-center'}>
                <div className={`flex w-1/2 flex-shrink-0 flex-col`}>
                    <h1 className={`text-3xl font-bold`}>{movie.title}</h1>
                    <p>{movie.desc}</p>
                </div>
                <img
                    src={movie.poster}
                    className={`relative h-full object-cover`}
                    alt={movie.title}
                />
            </div>
        </motion.div>
    );
};

export default MovieModal;
