import React, { useEffect, useState } from 'react';
import { Movie } from '../../types/Movie';
import { AnimatePresence, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

type MovieCardProps = {
    title: Movie['title'];
    desc: Movie['desc'];
    poster: Movie['poster'];
};

const MovieCardSkeleton = () => {
    const variants = {
        shimmer: {
            opacity: [0.5, 1, 0.5],
            transition: { repeat: Infinity, duration: 100 },
        },
    };
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={`shimmer`}
            exit={{ opacity: 0 }}
        >
            <div
                className={`absolute aspect-[1/1.5] min-w-[200px] rounded-lg bg-slate-200`}
            />
        </motion.div>
    );
};

const MovieCard = ({ title, desc, poster }: MovieCardProps) => {
    const [isPosterLoaded, setIsPosterLoaded] = useState(false);
    const { ref, inView } = useInView();

    return (
        <motion.div
            className={`relative bg-cover`}
            ref={ref}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
        >
            <AnimatePresence>
                {!isPosterLoaded && <MovieCardSkeleton />}
            </AnimatePresence>

            <motion.img
                initial={{ opacity: 0 }}
                animate={isPosterLoaded ? { opacity: 1 } : { opacity: 0 }}
                src={poster}
                className={`aspect-[1/1.5] min-w-[200px] rounded-lg`}
                alt={`${title} poster`}
                loading={`lazy`}
                onLoad={() => {
                    setTimeout(() => {
                        setIsPosterLoaded(true);
                    }, 5000);
                }}
            />
            <h1>{title}</h1>
            <p>{desc}</p>
        </motion.div>
    );
};

export default MovieCard;
