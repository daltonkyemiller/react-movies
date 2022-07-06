import { useEffect, useState } from 'react';

type Dimensions = {
    width: number;
    height: number;
};

const useWindowDimensions = (): Dimensions => {
    const [windowDimensions, setWindowDimensions] = useState<Dimensions>({
        width: 1,
        height: 1,
    });
    useEffect(() => {
        // Function that updates state to current window dimensions
        const handleResize = (): void => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            setWindowDimensions({
                width: width,
                height: height,
            });
        };
        // Called once immediately on mount to get initial window size
        handleResize();
        // Adding a listener to the resize event
        window.addEventListener('resize', handleResize);

        return (): void => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
};

export default useWindowDimensions;
