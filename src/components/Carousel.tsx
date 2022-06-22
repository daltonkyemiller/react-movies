import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import React, {
    PropsWithChildren,
    useEffect,
    useRef, useState,
} from 'react';
import useMeasure from 'react-use-measure';
import { mergeRefs } from 'react-merge-refs';

type CarouselProps = {
    cards: Array<CardProps>;
    limit: number;
}

const Carousel = ({limit, cards}: CarouselProps) => {
    const [ref, {left, width, height}] = useMeasure();
    const [carousel, {width: carouselWidth}] = useMeasure();
    const x = useSpring(0);
    const [curr, setCurr] = useState(0);


    useEffect(() => console.log(width), [width]);


    return (
        <div className={`overflow-hidden`} ref={carousel} key={carouselWidth}>
            {/*<AiOutlineLeft className={`absolute z-10 left-0 text-5xl cursor-pointer bg-red-300`}*/}
            {/*               onClick={() => ''}/>*/}
            <motion.div ref={ref}
                        className={`flex gap-5 w-fit cursor-grab `}
                        drag={'x'}
                        dragConstraints={{left: -width + carouselWidth, right: 0}}
                        key={width}
            >
                {
                    cards.map(card => <Card title={card.title} desc={card.desc}/>)
                }
            </motion.div>
            {/*<AiOutlineRight className={`absolute z-10 right-0 text-5xl cursor-pointer bg-red-300`}*/}
            {/*                onClick={() => ''}/>*/}

        </div>
    );
};

type CardProps = {
    title: string;
    desc: string;
}

const Card = ({title, desc}: CardProps) => {

    return (
        <div className={`prose min-w-[25vw] md:min-w-[50vw]`}>
            <h1>{title}</h1>
            <p>{desc}</p>
        </div>
    );
};

export default Carousel;