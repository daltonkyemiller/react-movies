import { AnimatePresence, motion } from 'framer-motion';
import React, { useContext, useEffect, useState } from 'react';
import { Movie } from '../../types/Movie';
import { TMDB_IMAGE_URL } from '../../utils/consts';
import Image from '../Image/Image';
import { getCastDetails, getMovieById } from '../../utils/fetches';
import { useQuery, useQueryClient } from 'react-query';
import { BiListMinus, BiListPlus } from 'react-icons/all';
import { MovieListContext } from '../../context/movieListContext';

type MovieModalProps = {
    movie: Movie;
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
};

const MovieModal = ({ movie, isOpen, setIsOpen }: MovieModalProps) => {
    const { isLoading, data: castDetails } = useQuery(
        ['castDetails', movie.id],
        () => getCastDetails(movie.id)
    );
    const { addMovie, removeMovie, isInList } = useContext(MovieListContext);
    const queryClient = useQueryClient();

    if (isLoading) return <></>;

    const variants = {
        show: {
            display: 'flex',
            scale: 1,
            opacity: 1,
        },
        hide: {
            opacity: 0,
            scale: 0.5,
        },
    };

    const movieListVariants = {
        show: {
            opacity: 1,
        },
        hide: {
            opacity: 0,
        },
    };
    return (
        <AnimatePresence exitBeforeEnter={true}>
            {isOpen && (
                <motion.div
                    className={`fixed inset-0 z-[100]`}
                    exit={{ opacity: 0 }}
                    onClick={(e) => {
                        if (e.target === e.currentTarget) setIsOpen(false);
                    }}
                >
                    <motion.div
                        className={`fixed inset-0 flex items-center justify-center 
                    overflow-clip rounded-xl bg-gray-100 shadow-[0_0_50px_0_rgba(0,0,0,0.25)]
                    dark:bg-gray-900 dark:shadow-[0_0_50px_0_rgba(255,255,255,0.25)] md:inset-20`}
                        variants={variants}
                        initial={`hide`}
                        animate={'show'}
                        exit={`hide`}
                    >
                        <button
                            className={`absolute left-3 top-3 z-20 text-3xl`}
                            onClick={() => setIsOpen(false)}
                        >
                            X
                        </button>
                        <button
                            className={`absolute bottom-3 left-3 z-20 text-5xl `}
                            title={`${
                                isInList!(movie.id)
                                    ? 'Remove from list'
                                    : 'Add to list'
                            }`}
                            onClick={() => {
                                if (isInList!(movie.id)) {
                                    removeMovie!(movie);
                                    return;
                                }
                                addMovie!(movie);
                            }}
                        >
                            {isInList!(movie.id) ? (
                                <BiListMinus />
                            ) : (
                                <BiListPlus />
                            )}
                        </button>

                        {/*Movie Content*/}
                        <div
                            className={
                                'isolate flex h-full flex-col items-center md:flex-row'
                            }
                            key={movie.title}
                        >
                            <motion.div
                                className={`flex w-full flex-shrink-0 flex-col p-10 md:w-1/2`}
                                initial={{ opacity: 0, x: -100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0 }}
                            >
                                <h1 className={`pb-4 text-4xl font-bold`}>
                                    {movie.title}
                                </h1>
                                <p>{movie.desc}</p>
                                <p className={`pt-5 font-bold`}>
                                    Starring:&nbsp;
                                    {castDetails.cast
                                        .filter((el: any, i: number) => i < 5)
                                        .map((person: any) => person.name)
                                        .join(', ')}
                                </p>
                                <p className={`pt-1 font-bold`}>
                                    Directed By:&nbsp;
                                    {castDetails.crew
                                        .filter(
                                            (el: any, i: number) =>
                                                el.job === 'Director'
                                        )
                                        .map((person: any) => person.name)
                                        .join(', ')}
                                </p>
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
                                <Image
                                    src={
                                        TMDB_IMAGE_URL +
                                        (movie.backdrop ?? movie.poster)
                                    }
                                    alt={movie.title}
                                />
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MovieModal;
