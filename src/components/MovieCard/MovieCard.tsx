import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { Movie } from '../../types/Movie';


const MovieCard = ({title, poster, desc, castDetails}: Movie) => {
    const [showDetails, setShowDetails] = useState(false);
    const [isShown, setIsShown] = useState(false);


    const detailsVariants = {
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
            className={`flex flex-col 
            items-center relative`}
            style={{
                zIndex: showDetails ? 9999 : 0
            }}
        >
            <motion.div
                className={`relative ${showDetails ? 'z-50' : ''} flex flex-col
                shrink-0 aspect-[1/1.5] w-[10em] md:w-[15em] rounded-xl`}

                // animate={{scale: showDetails ? 1.25 : 1}}
                style={
                    {
                        backgroundImage: `url(${poster})`,
                        backgroundSize: 'cover',
                    }}
                onMouseEnter={() => setShowDetails(true)}
                onMouseLeave={() => setShowDetails(false)}

            />
            <motion.div
                variants={detailsVariants}
                initial={'hide'}
                animate={showDetails ? 'show' : 'hide'}
                transition={{type: 'spring', bounce: .1}}
                onAnimationComplete={(a) => {
                    if (a === 'show') setIsShown(true);
                    if (a === 'hide') setIsShown(false);
                }}
                className={`absolute z-20 flex flex-col w-[125%] h-[135%] p-3 bg-slate-500 rounded-xl`}>
                <h1 className={`relative font-bold relative mt-auto`}>{title}</h1>
                <p className={`relative`}>{title}</p>
            </motion.div>


        </div>
    );
};

export default MovieCard;