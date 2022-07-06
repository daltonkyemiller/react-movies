import { motion, useAnimation, useMotionValue, useSpring } from 'framer-motion';
import React, {
    ForwardedRef,
    PropsWithChildren,
    useCallback,
    useEffect,
    useRef,
} from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/all';
import useMeasure from 'react-use-measure';
import { useInView } from 'react-intersection-observer';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import _ from 'lodash';

type CarouselProps = {
    gap?: string;
    className?: string;
};

const Carousel = ({
    children,
    gap,
    className,
}: PropsWithChildren<CarouselProps>) => {
    const _childrenArr = React.Children.toArray(children);

    const x = useSpring(0, { stiffness: 300, damping: 50 });

    const [carouselRef, { left: carouselLeft, width: carouselWidth }] =
        useMeasure();

    const containerRef = useRef<HTMLDivElement>(null);

    const { width: screenWidth } = useWindowDimensions();

    const moveCarousel = useCallback(
        (offset: number) => {
            const _x = x.get();
            const newX: number = _.clamp(
                _x + offset,
                -carouselWidth + screenWidth,
                0
            );
            x.set(newX);
        },
        [carouselWidth, screenWidth, x]
    );

    useEffect(() => {
        const handleArrows = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') moveCarousel(500);
            if (e.key === 'ArrowRight') moveCarousel(-500);
        };

        if (document.activeElement === containerRef.current) {
            document.addEventListener('keydown', handleArrows);

            return () => document.removeEventListener('keydown', handleArrows);
        }
    }, [moveCarousel]);

    return (
        <div
            className={`relative overflow-x-clip ${className}`}
            key={screenWidth}
            ref={containerRef}
        >
            <AiOutlineLeft
                className={`absolute top-1/2 left-0 z-50 -translate-y-1/2 cursor-pointer rounded-sm bg-slate-400 bg-opacity-75 text-4xl text-white`}
                onClick={() => {
                    moveCarousel(500);
                }}
            />
            <motion.div
                ref={carouselRef}
                drag={'x'}
                className={`relative flex min-w-fit`}
                style={{ x, gap }}
                dragConstraints={{
                    left: -carouselWidth + screenWidth,
                    right: 0,
                }}
            >
                {_childrenArr.map((child, i) => (
                    <CarouselItem
                        key={i}
                        style={{
                            backfaceVisibility: 'hidden',
                            userSelect: 'none',
                            pointerEvents: 'none',
                        }}
                    >
                        {child}
                    </CarouselItem>
                ))}
            </motion.div>
            <AiOutlineRight
                className={`absolute top-1/2 right-0 z-50 -translate-y-1/2 cursor-pointer rounded-sm bg-slate-400 bg-opacity-75 text-4xl text-white`}
                onClick={() => {
                    moveCarousel(-500);
                }}
            />
        </div>
    );
};

type CarouselItemProps = {
    style?: React.CSSProperties;
};
const CarouselItem = (
    { children, style }: PropsWithChildren<CarouselItemProps>,
    ref: ForwardedRef<any>
) => {
    const { ref: inViewRef, inView } = useInView({ initialInView: true });

    return (
        <motion.div
            // animate={inView ? { opacity: [0, 1] } : { opacity: 0 }}
            className={`inline-block`}
            style={{ ...style }}
            ref={inViewRef}
        >
            {children}
        </motion.div>
    );
};

export default Carousel;
