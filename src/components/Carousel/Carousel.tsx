import { motion, useMotionValue, useSpring } from 'framer-motion';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/all';
import useMeasure from 'react-use-measure';

type CarouselProps = {};

const Carousel = ({ children }: PropsWithChildren<CarouselProps>) => {
    const childrenArr = React.Children.toArray(children);

    const x = useMotionValue(0);
    const marginOffset = useMotionValue(0);
    const [idxOffset, setIdxOffset] = useState(
        new Array(childrenArr.length).map((_, idx) => idx)
    );

    // const [cardRef, { width }] = useMeasure();
    //
    useEffect(() => {
        x.onChange(() => {
            const xVal = x.get();
            if (xVal > 0) {
            }
        });
    }, [x]);

    return (
        <div className={`flex align-middle`}>
            <AiOutlineLeft
                className={`absolute top-1/2 left-0 -translate-y-1/2 bg-orange-400 text-3xl`}
            />
            <motion.div
                className={`flex`}
                drag={'x'}
                style={{ x }}
                // onDrag={handleDrag}
                // dragConstraints={{ right: 0 }}
            >
                {React.Children.map(children, (child, index) => {
                    return React.cloneElement(child as React.ReactElement, {
                        style: { flexShrink: 0, order: idxOffset[index] },
                    });
                })}
            </motion.div>
            <AiOutlineRight
                className={`absolute top-1/2 right-0 -translate-y-1/2 bg-orange-400 text-3xl`}
            />
        </div>
    );
};

export default Carousel;
