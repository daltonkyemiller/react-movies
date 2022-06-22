import { motion, useMotionValue, useSpring } from 'framer-motion';
import React, {
    ForwardedRef,
    forwardRef,
    PropsWithChildren,
    ReactElement,
    ReactNode,
    useState
} from 'react';
import useMeasure from 'react-use-measure';
import { useInView } from 'react-intersection-observer';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/all';
import { mergeRefs } from 'react-merge-refs';

type CarouselProps = {
    cards: Array<MovieCardProps>
}

const Carousel = ({cards, children}: PropsWithChildren<CarouselProps>) => {
    const childrenArray: Array<ReactNode> = React.Children.toArray(children);

    const [carouselContainerRef, {width: carouselContainerWidth}] = useMeasure();
    const [cardRef, {width: cardWidth}] = useMeasure();
    const [carousel, {width: carouselWidth}] = useMeasure();
    const {
        ref: firstCard,
    } = useInView({onChange: handleFirstCardInView});
    const {
        ref: lastCard,
    } = useInView({onChange: handleLastCardInView});
    const [shiftedChildren, setShiftedChildren] = useState<Array<ReactNode>>(childrenArray);

    const marginOffset = useMotionValue(0);

    const x = useSpring(0, {damping: 10, stiffness: 50});

    function handleFirstCardInView(inView: boolean) {
        if (inView) {
            const arrCopy = [...shiftedChildren];
            arrCopy.unshift(arrCopy.pop());
            setShiftedChildren(arrCopy);
            marginOffset.set(marginOffset.get() - (cardWidth + 5));
        }
    }

    function handleLastCardInView(inView: boolean) {
        if (inView) {
            const arrCopy = [...shiftedChildren];
            arrCopy.push(arrCopy.shift());
            setShiftedChildren(arrCopy);
            marginOffset.set(marginOffset.get() + (cardWidth + 5));
        }
    }

    return (
        <div className={`flex items-center overflow-hidden`} ref={carousel} key={carouselWidth}>
            <AiOutlineLeft className={`absolute z-10 left-0 text-5xl cursor-pointer bg-red-300`}
                           onClick={() => x.set(x.get() + cardWidth)}/>

            <motion.div ref={carouselContainerRef}
                        className={`flex  w-fit cursor-grab`}
                        drag={'x'}

                        style={{marginLeft: marginOffset, x}}
                        key={carouselWidth}
            >
                {
                    React.Children.map(shiftedChildren, (child, idx) => {
                        return React.cloneElement(child as ReactElement, {
                            ref: idx === 0 ? firstCard : idx === shiftedChildren.length - 1 ? mergeRefs([lastCard, cardRef]) : null,
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
    title: string;
    desc: string;
}

const MovieCard = forwardRef(({title, desc}: MovieCardProps, ref: ForwardedRef<HTMLDivElement>) => {
    const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500'];
    const [randomColor, setRandomColor] = useState(colors[Math.floor(Math.random() * colors.length)]);
    return (
        <div className={`prose h-50 min-w-[25vw] md:min-w-[50vw] p-5 ${randomColor}`} ref={ref}>
            <h1>{title}</h1>
            <p>{desc}</p>
        </div>
    );
});


export default Carousel;