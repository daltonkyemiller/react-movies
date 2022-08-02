import React, { useContext, useEffect, useState } from 'react';
import { Movie } from '../../types/Movie';
import { AnimatePresence, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './MovieCard.module.css';
import Image from '../../components/Image/Image';

type MovieCardProps = {
    title: Movie['title'];
    poster: Movie['poster'];
    desc: Movie['desc'];
    onClick: () => void;
};

const MovieCard = ({
    title,
    poster,
    desc,
    onClick,
    ...rest
}: MovieCardProps) => {
    const [isPosterLoaded, setIsPosterLoaded] = useState(false);

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
            className={`relative transition-transform hover:scale-95`}
            onClick={onClick}
            {...rest}
        >
            <div className={`${styles.img} overflow-hidden `}>
                <Image
                    src={poster}
                    alt={`${title} poster`}
                    onLoad={() => setIsPosterLoaded(true)}
                    delay={3000}
                />
            </div>
            <h1
                className={`text-md absolute max-w-full overflow-hidden text-ellipsis whitespace-nowrap font-bold`}
            >
                {title}
            </h1>
        </motion.div>
    );
};

export default MovieCard;
