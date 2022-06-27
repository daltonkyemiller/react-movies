import { animate, motion } from 'framer-motion';
import React, { useState } from 'react';
import { Movie } from '../../types/Movie';
import { log } from 'util';
import useMeasure from 'react-use-measure';


const MovieCard = ({title, poster, desc, castDetails}: Movie) => {
    const [showDetails, setShowDetails] = useState(false);
    const [isShown, setIsShown] = useState(false);


    const variants = {
        show: {
            display: 'flex',
            opacity: 1,
            scale: 1,
        },
        hide: {
            opacity: 0,
            scale: 0,
            transitionEnd: {
                display: 'none'
            }
        }
    };

    return (
        <div
            className={`${showDetails ? 'z-[9999]' : ''} flex flex-col relative 
            items-center justify-center isolate`}
        >
            <motion.div
                variants={variants}
                initial={'hide'}
                animate={showDetails ? 'show' : 'hide'}
                transition={{type: 'spring', bounce: .1}}
                onAnimationComplete={(a) => {
                    if (a === 'show') setIsShown(true);
                    if (a === 'hide') setIsShown(false);
                }}
                className={`fixed -z-1 flex flex-col w-[25vmax] h-[50vmax] p-3 bg-amber-300 rounded-xl`}>
                <h1 className={`relative mt-auto font-bold text-2xl`}>{title}</h1>
                <h1 className={`relative font-bold text-2xl`}>{title}</h1>
            </motion.div>

            <div
                className={`relative z-0 flex flex-col shrink-0 aspect-[1/1.5] w-[10em] md:w-[15em] rounded-xl`}
                style={
                    {
                        backgroundImage: `url(${poster})`,
                        backgroundSize: 'cover',
                    }}
                onMouseEnter={() => setShowDetails(true)}
                onMouseLeave={() => setShowDetails(false)}

            >

            </div>

        </div>
    );
};

export default MovieCard;