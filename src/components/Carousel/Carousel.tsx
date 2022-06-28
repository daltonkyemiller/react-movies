import { motion, useMotionValue, useSpring } from 'framer-motion';
import React, {
    ForwardedRef,
    forwardRef,
    PropsWithChildren,
    ReactElement,
    ReactNode, useEffect, useRef,
    useState
} from 'react';
import useMeasure from 'react-use-measure';
import { useInView } from 'react-intersection-observer';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/all';
import { mergeRefs } from 'react-merge-refs';
import { log } from 'util';

type CarouselProps = {
    className?: string;
}

const Carousel = ({className, children}: PropsWithChildren<CarouselProps>) => {
    const childrenArr = React.Children.toArray(children);
    const [cardRef, {width: cardWidth}] = useMeasure();
    const [carousel, {width: carouselWidth}] = useMeasure();
    const {
        ref: firstCard,
    } = useInView({onChange: handleFirstCardInView, initialInView: false});

    const {
        ref: lastCard,
    } = useInView({onChange: handleLastCardInView});


    const [isDragging, setIsDragging] = useState(false);
    const marginOffset = useMotionValue(-20);

    const x = useSpring(0, {damping: 10, stiffness: 25});

    const [idxArr, setIdxArr] = useState<Array<number>>(childrenArr.map((_, idx) => idx));

    function handleFirstCardInView(inView: boolean) {
        if (inView) {
            const arrCopy = [...idxArr];
            arrCopy.push(arrCopy.shift() as number);
            console.log(arrCopy);
            setIdxArr(arrCopy);
            marginOffset.set(marginOffset.get() - (cardWidth));
        }
    }

    function handleLastCardInView(inView: boolean) {
        if (inView) {
            const arrCopy = [...idxArr];
            arrCopy.unshift(arrCopy.pop() as number);
            console.log(arrCopy);
            setIdxArr(arrCopy);
            marginOffset.set(marginOffset.get() + (cardWidth));
        }
    }


    return (
        <div
            className={`flex items-center ${className ? className : ''}`}
            ref={carousel}
            key={carouselWidth}>

            <AiOutlineLeft className={`absolute z-10 left-0 text-5xl cursor-pointer bg-red-300`}
                           onClick={() => x.set(x.get() + cardWidth)}/>

            <motion.div
                className={`flex w-fit cursor-grab `}
                drag={'x'}
                onPan={() => setIsDragging(true)}
                onPanEnd={() => setIsDragging(false)}
                style={{marginLeft: marginOffset, x}}
            >
                <CarouselCell ref={firstCard} className={`bg-red-500 min-h-full`}
                              style={{width: `${cardWidth}px`, order: -1}}/>

                {
                    childrenArr.map((child, idx) => React.cloneElement(child as ReactElement, {
                        ref: cardRef,
                        style: {
                            order: idxArr[idx]
                        }
                    }))
                }
                <CarouselCell ref={lastCard} className={`bg-red-500 min-h-full`}
                              style={{width: cardWidth + 'px', order: childrenArr.length}}/>

            </motion.div>
            <AiOutlineRight className={`absolute z-10 right-0 text-5xl cursor-pointer bg-red-300`}
                            onClick={() => x.set(x.get() - cardWidth)}/>

        </div>
    );
};


type CarouselCellProps = {
    // limit: [number, number];
    className?: string;
    style?: object;
}

export const CarouselCell = forwardRef(({children, className, style}: PropsWithChildren<CarouselCellProps>,
                                        ref: ForwardedRef<HTMLDivElement>) => {
    return (
        <div
            className={`shrink-0 ${className}`}
            style={{...style}}
            ref={ref}>
            {children}
        </div>
    );
});


export default Carousel;