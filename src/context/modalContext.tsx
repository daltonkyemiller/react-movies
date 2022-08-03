import { createContext, ReactNode } from 'react';
import { Modal } from '../types/Modal';
import useModal from '../hooks/useModal';

const ModalContext = createContext<Modal>({
    isOpen: false,
    content: {
        title: '',
        body: '',
    },
});

const ModalProvider = ({ children }: { children: ReactNode }) => {
    const { isOpen, content, openModal, closeModal } = useModal();
    return (
        <ModalContext.Provider
            value={{ isOpen, content, openModal, closeModal }}
        >
            {children}
        </ModalContext.Provider>
    );
};

export { ModalProvider, ModalContext };
