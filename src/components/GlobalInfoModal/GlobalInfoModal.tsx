import { motion } from 'framer-motion';
import React, { PropsWithChildren, useContext } from 'react';
import { createPortal } from 'react-dom';
import { ModalContext } from '../../context/modalContext';

const GlobalInfoModal = ({ children }: PropsWithChildren) => {
    const { content } = useContext(ModalContext);
    return (
        <motion.div
            initial={{ opacity: 0, y: 25, x: '-50%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`fixed top-2 left-1/2 z-50 rounded-full bg-slate-900 px-4 py-3 text-center text-slate-50 dark:bg-slate-50 dark:text-slate-900`}
        >
            <h1 className={`text-lg font-bold`}>{content.title}</h1>
            {/*<p>{content.body}</p>*/}
        </motion.div>
    );
};

export default GlobalInfoModal;
