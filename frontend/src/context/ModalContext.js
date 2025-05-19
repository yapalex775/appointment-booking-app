import { createContext, useState } from 'react';

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [modal, setModal] = useState({ type: null, props: {} });

    const openModal = (type, props = {}) => setModal({ type, props });
    const closeModal = () => setModal({ type: null, props: {} });

    return (
        <ModalContext.Provider value={{ modal, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
};
