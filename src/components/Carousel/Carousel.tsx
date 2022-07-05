import { motion, useAnimation, useMotionValue, useSpring } from 'framer-motion';
import React, {
    ForwardedRef,
    forwardRef,
    PropsWithChildren,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/all';
import useMeasure from 'react-use-measure';
import { useInView } from 'react-intersection-observer';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { mergeRefs } from 'react-merge-refs';

type CarouselProps = {};

const Carousel = ({ children }: PropsWithChildren<CarouselProps>) => {
    const childrenArr = React.Children.toArray(children);

    const anim = useAnimation();
    const x = useSpring(0, { stiffness: 25, damping: 10 });
    const [cardWidth, setCardWidth] = useState(500);
    const [idxOffset, setIdxOffset] = useState(
        childrenArr.map((_, i) => [i, i * cardWidth])
    );

    const [isPastBeginning, setIsPastBeginning] = useState(false);
    const [isPastEnd, setIsPastEnd] = useState(false);

    const [carouselRef, { width: carouselWidth }] = useMeasure();
    const { width: screenWidth } = useWindowDimensions();

    useLayoutEffect(() => {
        setCardWidth(() => carouselWidth);
    }, [carouselWidth]);

    useLayoutEffect(() => {
        setIdxOffset((latest) => latest.map((_, i) => [i, i * cardWidth]));
    }, [cardWidth]);

    function onDragUpdate(latest: any) {
        const padding = 500;
        const firstItem = idxOffset.filter((el) => el[0] === 0)[0];
        const lastItem = idxOffset.filter(
            (el) => el[0] === idxOffset.length - 1
        )[0];
        const latestOff = latest.x;

        // console.log(latestOff);

        if (latestOff < -firstItem[1] && isPastBeginning)
            setIsPastBeginning(false);

        if (-latestOff + screenWidth < lastItem[1] && isPastEnd)
            setIsPastEnd(false);

        if (latestOff > -firstItem[1] && !isPastBeginning) {
            console.log('past beginning');
            setIsPastBeginning(true);

            // @ts-ignore
            const copy = idxOffset.map(([elIdx, elPos], i) => {
                const lastIdx = idxOffset.length - 1;
                const isLast = elIdx === lastIdx;
                if (isLast) {
                    elIdx = 0;
                    elPos = firstItem[1] - cardWidth;
                } else {
                    elIdx = elIdx + 1;
                }
                return [elIdx, elPos];
            });
            setIdxOffset(copy);
        }

        if (-latestOff + screenWidth > lastItem[1] && !isPastEnd) {
            setIsPastEnd(true);

            const copy = idxOffset.map(([elIdx, elPos], i) => {
                const lastIdx = idxOffset.length - 1;
                const isFirst = elIdx === 0;
                if (isFirst) {
                    elIdx = lastIdx;
                    elPos = lastItem[1] + cardWidth;
                } else {
                    elIdx = elIdx - 1;
                }
                return [elIdx, elPos];
            });
            setIdxOffset(copy);
        }
    }

    return (
        <div className={`relative`} ref={carouselRef}>
            <AiOutlineLeft
                className={`absolute top-1/2 left-0 z-50 -translate-y-1/2 bg-orange-400 text-3xl`}
                onClick={() => {
                    x.set(x.get() + cardWidth);
                }}
            />
            <motion.div
                onUpdate={onDragUpdate}
                className={`relative flex`}
                drag={'x'}
                // style={{ x }}

                // onDrag={handleDrag}
                // dragConstraints={{ right: 0 }}
            >
                {childrenArr.map((child, idx) => (
                    <CarouselItem
                        key={idx}
                        style={{
                            height: '500px',
                            width: cardWidth,
                            left: idxOffset[idx][1],
                            order: idxOffset[idx][0],
                            backfaceVisibility: 'hidden',
                            // left: 100 * idx,
                        }}
                    >
                        {child}
                    </CarouselItem>
                ))}
            </motion.div>
            <AiOutlineRight
                className={`absolute top-1/2 right-0 -translate-y-1/2 bg-orange-400 text-3xl`}
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
            className={`absolute flex-shrink-0 bg-red-500`}
            style={{ ...style }}
            ref={inViewRef}
        >
            {children}
        </motion.div>
    );
};

export default Carousel;
