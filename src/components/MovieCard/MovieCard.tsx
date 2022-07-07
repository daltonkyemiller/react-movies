import React, { useContext, useEffect, useState } from 'react';
import { Movie } from '../../types/Movie';
import { AnimatePresence, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './MovieCard.module.css';
import { ThemeContext } from '../../utils/theme/themeContext';
import Image from '../../components/Image/Image';

type MovieCardProps = {
    title: Movie['title'];
    desc: Movie['desc'];
    poster: Movie['poster'];
    onClick: () => void;
};

type SkeletonProps = {
    title: Movie['title'];
};

const MovieCard = ({
    title,
    desc,
    poster,
    onClick,
    ...rest
}: MovieCardProps) => {
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
        <motion.div
            className={`relative bg-cover transition-transform hover:scale-110`}
            variants={variants}
            ref={ref}
            initial={`hide`}
            animate={inView ? 'show' : 'hide'}
            onClick={onClick}
            {...rest}
        >
            {/*<motion.img*/}
            {/*    // initial={{ opacity: 0 }}*/}
            {/*    // animate={isPosterLoaded ? { opacity: 1 } : { opacity: 0 }}*/}
            {/*    src={poster}*/}
            {/*    className={`${styles.img}`}*/}
            {/*    alt={`${title} poster`}*/}
            {/*    loading={`lazy`}*/}
            {/*    onLoad={() => {*/}
            {/*        setTimeout(() => {*/}
            {/*            setIsPosterLoaded(true);*/}
            {/*        }, 1000);*/}
            {/*    }}*/}
            {/*/>*/}
            <div className={`${styles.img} overflow-hidden`}>
                <Image
                    src={poster}
                    alt={`${title} poster`}
                    onLoad={() => setIsPosterLoaded(true)}
                    delay={3000}
                />
            </div>
            <h1 className={`text-md font-bold`}>{title}</h1>
            <p>{desc}</p>
        </motion.div>
    );
};

export default MovieCard;
