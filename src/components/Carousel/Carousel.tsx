import { motion, useMotionValue, useSpring } from 'framer-motion';
import React, {
    ForwardedRef,
    forwardRef,
    PropsWithChildren,
    ReactElement,
    ReactNode, useRef,
    useState
} from 'react';
import useMeasure from 'react-use-measure';
import { useInView } from 'react-intersection-observer';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/all';
import { mergeRefs } from 'react-merge-refs';

type CarouselProps = {
    className?: string;
}

const Carousel = ({className, children}: PropsWithChildren<CarouselProps>) => {
    const childrenArray: Array<ReactNode> = React.Children.toArray(children);
    const [cardRef, {width: cardWidth}] = useMeasure();
    const [carousel, {width: carouselWidth}] = useMeasure();
    const {
        ref: firstCard,
    } = useInView({onChange: handleFirstCardInView, initialInView: true});

    const {
        ref: lastCard,
    } = useInView({onChange: handleLastCardInView});


    const [shiftedChildren, setShiftedChildren] = useState<Array<ReactNode>>(childrenArray);
    const [isDragging, setIsDragging] = useState(false);

    const marginOffset = useMotionValue(0);

    const x = useSpring(0, {damping: 10, stiffness: 25});

    function handleFirstCardInView(inView: boolean) {
        if (inView) {
            const arrCopy = [...shiftedChildren];
            arrCopy.unshift(arrCopy.pop());
            setShiftedChildren(arrCopy);
            marginOffset.set(marginOffset.get() - (cardWidth));
        }
    }

    function handleLastCardInView(inView: boolean) {
        if (inView) {
            const arrCopy = [...shiftedChildren];
            arrCopy.push(arrCopy.shift());
            setShiftedChildren(arrCopy);
            marginOffset.set(marginOffset.get() + (cardWidth));
        }
    }

    return (
        <div className={`flex items-center overflow-hidden ${className}`} ref={carousel} key={carouselWidth}>
            <AiOutlineLeft className={`absolute z-10 left-0 text-5xl cursor-pointer bg-red-300`}
                           onClick={() => x.set(x.get() + cardWidth)}/>

            <motion.div
                className={`flex w-fit cursor-grab`}
                drag={'x'}
                onPan={() => setIsDragging(true)}
                onPanEnd={() => setIsDragging(false)}
                style={{marginLeft: marginOffset, x}}
            >
                {
                    React.Children.map(shiftedChildren, (child, idx) => {
                        return React.cloneElement(child as ReactElement, {
                            ref: idx === 1
                                ? mergeRefs([cardRef, firstCard]) :
                                idx === shiftedChildren.length - 1
                                    ? lastCard
                                    : null,
                        });
                    })
                }
            </motion.div>
            <AiOutlineRight className={`absolute z-10 right-0 text-5xl cursor-pointer bg-red-300`}
                            onClick={() => x.set(x.get() - cardWidth)}/>

        </div>
    );
};


type MovieCardProps = {
    // limit: [number, number];
    className?: string;
}

export const CarouselCell = forwardRef(({children, className}: PropsWithChildren<MovieCardProps>,
                                        ref: ForwardedRef<HTMLDivElement>) => {
    const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-teal-400', 'bg-violet-400'];
    const [randomColor, setRandomColor] = useState(colors[Math.floor(Math.random() * colors.length)]);
    return (
        <div
            className={`prose shrink-0 h-50 p-5 ${randomColor} ${className}`}
            ref={ref}>
            {children}
        </div>
    );
});


export default Carousel;