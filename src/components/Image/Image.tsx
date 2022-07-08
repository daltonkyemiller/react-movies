import { motion } from 'framer-motion';
import React, { useContext, useState } from 'react';
import { ThemeContext } from '../../utils/theme/themeContext';

type ImageProps = {
    src: string;
    alt: string;
    delay?: number;
    onLoad?: () => void;
};

const Image = ({ src, alt, onLoad, delay, ...rest }: ImageProps) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className={`h-full w-full `}>
            {!isLoaded && <ImageSkeleton />}
            <motion.img
                initial={{ opacity: 0 }}
                animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
                src={src}
                alt={alt}
                className={`h-full w-full object-cover object-center`}
                onLoad={() => {
                    setTimeout(() => {
                        setIsLoaded(true);
                        if (onLoad) onLoad();
                    }, delay ?? 1000);
                }}
                {...rest}
            />
        </div>
    );
};

const ImageSkeleton = () => {
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
    return (
        <motion.div
            variants={shimmerVariants}
            initial={`initial`}
            animate={`shimmer`}
            className={`h-full w-full`}
            style={{
                backgroundSize: '1000px 100%',
                backgroundImage: `linear-gradient(to right, #eff1f3 4%, #e2e2e2 25%, #eff1f3 36%)`,
                filter: `${theme.theme === 'dark' ? 'invert(1)' : ''}`,
            }}
        />
    );
};

export default Image;
