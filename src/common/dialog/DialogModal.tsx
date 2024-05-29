import style from './DialogModal.module.css';
import React, { useEffect } from 'react';

export const DialogModal = ({
    showDialog,
    setShowDialog,
    options = {},
    children,
}: {
    showDialog: boolean;
    setShowDialog:
        | React.Dispatch<React.SetStateAction<boolean>>
        | ((value: boolean) => void);
    children: React.ReactNode;
    options?: {
        hasBackdrop?: boolean; //default true
        cancelable?: boolean; //default true
        closeAfter?: number; //default 300ms
    };
}) => {
    const CLOSE_AFTER_ANIMATION_MS = 300;
    const [showClosingAnimation, setShowClosingAnimation] =
        React.useState<boolean>(false);
    const modalRef = React.useRef<HTMLDialogElement>(null);
    options.hasBackdrop = options?.hasBackdrop ?? true;
    options.cancelable = options?.cancelable ?? true;
    options.closeAfter =
        options?.closeAfter && options?.closeAfter > 0
            ? options?.closeAfter
            : CLOSE_AFTER_ANIMATION_MS;
    const closeModalOnEsc = (e: React.KeyboardEvent<HTMLDialogElement>) => {
        if (e.key === 'Escape' && options.cancelable) {
            e.preventDefault();
            setShowDialog(false);
        }
    };
    const closeModalHandler = async () => {
        setShowClosingAnimation(true);
        setTimeout(() => {
            modalRef.current?.close();
            setShowClosingAnimation(false);
        }, options.closeAfter || CLOSE_AFTER_ANIMATION_MS);
    };
    useEffect(() => {
        if (showDialog) {
            options.hasBackdrop
                ? modalRef.current?.showModal()
                : setShowDialog(false);
        } else {
            closeModalHandler().then();
        }
    }, [showDialog]);

    const handleOnClick = (ev: React.MouseEvent<HTMLDialogElement>) => {
        if (ev.target === modalRef.current) {
            setShowDialog(false);
        }
    };

    return (
        <dialog
            onClick={handleOnClick}
            onKeyDown={closeModalOnEsc}
            ref={modalRef}
            aria-modal="true"
            aria-labelledby="dialog-title"
            className={` ${style.dialogModal} ${style.dialogBackDrop}
                ${
                    showClosingAnimation
                        ? style.backdropDisappear
                        : style.backdropAppear
                }`}
        >
            <div
                className={`  ${
                    showClosingAnimation
                        ? style.dialogDisappear
                        : style.dialogAppear
                } `}
                id={'dialog-content-container'}
            >
                {children}
            </div>
        </dialog>
    );
};
