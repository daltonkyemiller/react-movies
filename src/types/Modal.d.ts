export interface Modal {
    isOpen: boolean;
    content: {
        title: string;
        body: string;
    };
    openModal?: ({ title, body }: { title: string; body: string }) => void;
    closeModal?: () => void;
}
