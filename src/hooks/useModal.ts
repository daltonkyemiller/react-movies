import { useState } from 'react';
import { Modal } from '../types/Modal';

const useModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState({
        title: '',
        body: '',
    });

    const openModal: Modal['openModal'] = ({ title, body }) => {
        setContent({ title, body });
        setIsOpen(true);
    };
    const closeModal = () => setIsOpen(false);

    return { isOpen, openModal, closeModal, content };
};

export default useModal;
