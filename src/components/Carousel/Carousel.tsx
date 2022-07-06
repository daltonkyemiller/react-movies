import { motion, useAnimation, useMotionValue, useSpring } from 'framer-motion';
import React, {
    ForwardedRef,
    PropsWithChildren,
    useCallback,
    useState,
} from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/all';
import useMeasure from 'react-use-measure';
import { useInView } from 'react-intersection-observer';
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

    const x = useSpring(0, { stiffness: 100, damping: 50 });

    const [carouselRef, { width: carouselWidth }] = useMeasure();

    const [containerRef, { width: containerWidth }] = useMeasure();
    const [canDrag, setCanDrag] = useState(true);
    const [isDragging, setIsDragging] = useState(false);

    const moveCarousel = useCallback(
        (offset: number) => {
            const _x = x.get();
            const newX: number = _.clamp(
                _x + offset,
                -carouselWidth + containerWidth,
                0
            );
            x.set(newX);
        },
        [carouselWidth, containerWidth, x]
    );

    const breakDrag = useCallback(
        (resetPos: number) => {
            setCanDrag(false);
            setIsDragging(false);
            x.set(resetPos);
        },
        [x]
    );

    const dragUpdate = (latest: any) => {
        const { x: currX } = latest;
        const padding = 200;
        const xMinLimit = -padding;

        const xMaxLimit = carouselWidth - containerWidth + padding;
        // if (currX <= 0) x.set(0);
        console.log('currX', currX, 'f', xMaxLimit);
        if (-currX <= xMinLimit) breakDrag(0);
        if (-currX >= xMaxLimit) breakDrag(-xMaxLimit + padding);
    };

    return (
        <div
            className={`relative overflow-x-clip ${className}`}
            ref={containerRef}
        >
            <AiOutlineLeft
                className={`absolute top-1/2 left-0 z-50 -translate-y-1/2 cursor-pointer rounded-sm bg-slate-400 bg-opacity-75 text-4xl text-white`}
                onClick={() => {
                    moveCarousel(500);
                }}
            />
            <motion.div
                onUpdate={dragUpdate}
                key={containerWidth}
                ref={carouselRef}
                drag={canDrag ? 'x' : false}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={() => setIsDragging(false)}
                className={`relative flex min-w-fit ${
                    isDragging ? 'cursor-grabbing' : 'cursor-pointer'
                }`}
                style={{ x, gap }}
                dragConstraints={{
                    left: -carouselWidth + containerWidth,
                    right: 0,
                }}
                onMouseUp={() => {
                    if (!canDrag) setCanDrag(true);
                }}
            >
                {_childrenArr.map((child, i) => (
                    <CarouselItem key={i}>{child}</CarouselItem>
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
            className={`inline-block select-none`}
            style={{ ...style }}
            ref={inViewRef}
        >
            {children}
        </motion.div>
    );
};

export default Carousel;
