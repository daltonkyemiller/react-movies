import React, { useContext, useEffect, useState } from 'react';
import { Movie } from '../../types/Movie';
import { AnimatePresence, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './MovieCard.module.css';
import { ThemeContext } from '../../utils/theme/themeContext';

type MovieCardProps = {
    title: Movie['title'];
    desc: Movie['desc'];
    poster: Movie['poster'];
};

type SkeletonProps = {
    title: Movie['title'];
};

const MovieCard = ({ title, desc, poster, ...rest }: MovieCardProps) => {
    const [isPosterLoaded, setIsPosterLoaded] = useState(false);
    const { ref, inView } = useInView();

    const variants = {
        show: {
            opacity: 1,
        },
        hide: {
            opacity: 0,
        },
    };

    return (
        <>
            <AnimatePresence>
                {!isPosterLoaded && <MovieCardSkeleton title={title} />}
                {/*<MovieCardSkeleton title={title} />*/}
            </AnimatePresence>
            <motion.div
                className={`relative bg-cover transition-transform hover:scale-110`}
                variants={variants}
                ref={ref}
                initial={`hide`}
                animate={inView && isPosterLoaded ? 'show' : 'hide'}
                {...rest}
            >
                <motion.img
                    // initial={{ opacity: 0 }}
                    // animate={isPosterLoaded ? { opacity: 1 } : { opacity: 0 }}
                    src={poster}
                    className={`${styles.img}`}
                    alt={`${title} poster`}
                    loading={`lazy`}
                    onLoad={() => {
                        setTimeout(() => {
                            setIsPosterLoaded(true);
                        }, 1000);
                    }}
                />
                <h1 className={`text-md font-bold`}>{title}</h1>
                <p>{desc}</p>
            </motion.div>
        </>
    );
};

const MovieCardSkeleton = ({ title }: SkeletonProps) => {
    const theme = useContext(ThemeContext);

    const shimmerVariants = {
        initial: {
            backgroundPosition: '-1000px 0',
        },
        shimmer: {
            backgroundPosition: ['-1000px 0', '1000px 0'],
            transition: { repeat: Infinity, duration: 2, ease: 'linear' },
        },
    };
    const variants = {
        shimmer: {
            // opacity: [0.2, 1, 0.2],
            transition: { repeat: Infinity, duration: 2 },
        },
    };
    return (
        <motion.div
            variants={variants}
            initial={{ opacity: 1 }}
            animate={`shimmer`}
            exit={{ opacity: 0 }}
            className={`absolute flex flex-col gap-1`}
            // style={{ backgroundPosition: bgPosTemplate }}
        >
            <motion.div
                variants={shimmerVariants}
                initial={`initial`}
                animate={`shimmer`}
                className={`${styles.img}`}
                style={{
                    backgroundSize: '1000px 100%',
                    backgroundImage: `linear-gradient(to right, #eff1f3 4%, #e2e2e2 25%, #eff1f3 36%)`,
                    filter: `${theme.theme === 'dark' ? 'invert(1)' : ''}`,
                }}
            />

            <motion.h1
                className={`text-md max-h-3 w-fit max-w-[90%] rounded-full bg-slate-800 font-bold text-transparent`}
                variants={shimmerVariants}
                animate={`shimmer`}
                style={{
                    backgroundSize: '1000px 100%',
                    //language=CSS
                    backgroundImage: `linear-gradient(to right, #eff1f3 4%, #e2e2e2 25%, #eff1f3 36%)`,
                    filter: `${theme.theme === 'dark' ? 'invert(1)' : ''}`,
                }}
            >
                {title}
            </motion.h1>
        </motion.div>
    );
};

export default MovieCard;
