import { AnimatePresence, motion } from 'framer-motion';
import React, {
    PropsWithChildren,
    useEffect,
    useRef,
} from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/all';
import useMeasure from 'react-use-measure';
import { mergeRefs } from 'react-merge-refs';

type CarouselProps = {
    limit: number;
}

const Carousel = ({limit, children}: PropsWithChildren<CarouselProps>) => {
    const [ref, {left, width, height}] = useMeasure();
    const carousel = useRef(null);

    useEffect(() => {
        console.log(width);
    }, [width]);


    return (
        <div className={`flex items-center `}>
            {/*<AiOutlineLeft className={`absolute z-10 left-0 text-5xl cursor-pointer bg-red-300`}*/}
            {/*               onClick={() => ''}/>*/}
            <motion.div ref={mergeRefs([ref, carousel])}
                        className={`relative flex cursor-grab`}
                        drag={'x'}
                        dragConstraints={{left: -width, right: 0}}
                        key={width}
            >
                {
                    React.Children.map(children, (child, idx) => {
                        return React.cloneElement(child as React.ReactElement);
                    })
                }
            </motion.div>
            {/*<AiOutlineRight className={`absolute z-10 right-0 text-5xl cursor-pointer bg-red-300`}*/}
            {/*                onClick={() => ''}/>*/}

        </div>
    );
};


export default Carousel;