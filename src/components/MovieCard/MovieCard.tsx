import React, { useContext, useEffect, useRef, useState } from 'react';
import { Movie } from '../../types/Movie';
import { motion, useSpring } from 'framer-motion';
import styles from './MovieCard.module.css';
import Image from '../../components/Image/Image';
import { MovieListContext } from '../../context/movieListContext';
import { isMobile } from 'react-device-detect';
import { ModalContext } from '../../context/modalContext';
import { useInView } from 'react-intersection-observer';

type MovieCardProps = {
    movie: Movie;
    onClick: () => void;
};

const MovieCard = ({ movie, onClick, ...rest }: MovieCardProps) => {
    const [isPosterLoaded, setIsPosterLoaded] = useState(false);
    const { addMovie, removeMovie, isInList } = useContext(MovieListContext);
    const { isOpen, openModal, closeModal } = useContext(ModalContext);

    const variants = {
        show: {
            opacity: 1,
        },
        hide: {
            opacity: 0,
        },
    };

    const [aboutToDelete, setAboutToDelete] = useState(false);
    const { ref, inView } = useInView();
    const y = useSpring(0, { stiffness: 500, damping: 30 });
    return (
        <motion.div
            ref={ref}
            variants={variants}
            animate={inView ? 'show' : 'hide'}
            onPan={(e, i) => {
                if (isMobile) return;
                const { y: offY } = i.offset;
                const absY = Math.floor(Math.abs(offY));
                if (absY > 50) y.set(offY);
                if (absY >= 100) {
                    if (!isOpen)
                        openModal &&
                            openModal({
                                title: `Release to ${
                                    isInList!(movie.id)
                                        ? 'remove from'
                                        : 'add to'
                                } your list`,
                                body: '',
                            });
                    if (!aboutToDelete) setAboutToDelete(true);
                } else {
                    closeModal && closeModal();
                    setAboutToDelete(false);
                }
            }}
            onPanEnd={(e, i) => {
                if (isMobile) return;
                closeModal && closeModal();
                y.set(0);
                setAboutToDelete(false);
                if (aboutToDelete) {
                    if (isInList!(movie.id)) {
                        removeMovie && removeMovie(movie);
                    } else {
                        addMovie && addMovie(movie);
                    }
                }
                setAboutToDelete(false);
            }}
            style={{ y }}
            className={`relative rounded-xl transition-shadow ${
                aboutToDelete
                    ? isInList!(movie.id)
                        ? 'shadow-[0_0_75px] shadow-red-500'
                        : 'shadow-[0_0_75px] shadow-green-500'
                    : ''
            }`}
            onClick={onClick}
            {...rest}
        >
            <div className={`${styles.img} overflow-hidden`}>
                <Image
                    src={movie.poster}
                    alt={`${movie.title} poster`}
                    onLoad={() => setIsPosterLoaded(true)}
                    delay={3000}
                />
            </div>
            <h1
                className={`text-md absolute max-w-full overflow-hidden text-ellipsis whitespace-nowrap font-bold`}
            >
                {movie.title}
            </h1>
        </motion.div>
    );
};

export default MovieCard;
