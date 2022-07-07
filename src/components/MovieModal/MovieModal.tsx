import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Movie } from '../../types/Movie';

type MovieModalProps = {
    movie: Movie;
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
};

const MovieModal = ({ movie, isOpen, setIsOpen }: MovieModalProps) => {
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
        <AnimatePresence exitBeforeEnter={true}>
            {isOpen && (
                <motion.div
                    variants={variants}
                    initial={`hide`}
                    animate={'show'}
                    exit={`hide`}
                    className={`absolute inset-24 z-[100] flex items-center justify-center overflow-clip rounded-xl bg-gray-100 pl-5 dark:bg-gray-900`}
                >
                    <button
                        className={`absolute left-2 top-2 text-3xl`}
                        onClick={() => setIsOpen(false)}
                    >
                        X
                    </button>

                    {/*Movie Content*/}
                    <div
                        className={'isolate flex h-full items-center'}
                        key={movie.title}
                    >
                        <motion.div
                            className={`flex  w-1/2 flex-shrink-0 flex-col`}
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0 }}
                        >
                            <h1 className={`text-3xl font-bold`}>
                                {movie.title}
                            </h1>
                            <p>{movie.desc}</p>
                        </motion.div>

                        {/*Poster*/}
                        <motion.div
                            className={`h-full w-full overflow-hidden`}
                            initial={{
                                opacity: 0,
                                scale: 0.75,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                            }}
                            exit={{ opacity: 0, scale: 0.75 }}
                        >
                            <img
                                src={movie.backdrop}
                                className={`h-full w-full object-cover`}
                                alt={movie.title}
                            />
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MovieModal;
