import style from './BottomSheetModal.module.css';
import React, { useEffect } from 'react';

const WRAPPER_DIV_ID = 'bottom-sheet-position-inside-animation';

export const BottomSheetModal = ({
    showDialog,
    setShowDialog,
    options = {},
    children,
    cssPosition,
}: {
    showDialog: boolean;
    setShowDialog:
        | React.Dispatch<React.SetStateAction<boolean>>
        | ((value: boolean) => void);
    children: React.ReactNode;
    cssPosition?: React.CSSProperties;
    options?: {
        hasBackdrop?: boolean; //default true
        cancelable?: boolean; //default true
        closeAfter?: number; //default 300ms
        openAnimationDuration?: number; //default 300ms
    };
}) => {
    const CLOSE_AFTER_ANIMATION_MS = 300;
    const OPEN_ANIMATION_DURATION = options?.openAnimationDuration || 300;
    const [showClosingAnimation, setShowClosingAnimation] =
        React.useState<boolean>(false);
    const timerRef = React.useRef<any | null>(null);
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
        timerRef.current = setTimeout(() => {
            modalRef.current?.close();
            setShowClosingAnimation(false);
        }, options.closeAfter || CLOSE_AFTER_ANIMATION_MS);
    };
    useEffect(() => {
        timerRef.current && clearTimeout(timerRef.current);
        if (showDialog) {
            options.hasBackdrop
                ? modalRef.current?.showModal()
                : setShowDialog(false);
        } else {
            closeModalHandler().then();
        }
    }, [showDialog]);

    const handleOnClick = (ev: React.MouseEvent<HTMLDialogElement>) => {
        // @ts-expect-error this is a valid property
        if (ev?.target?.id === WRAPPER_DIV_ID) {
            setShowDialog(false);
        }
    };

    return (
        <dialog
            // @ts-expect-error this is a valid property
            style={{ '--animation-time-var': `${OPEN_ANIMATION_DURATION}ms` }}
            onClick={handleOnClick}
            onKeyDown={closeModalOnEsc}
            ref={modalRef}
            aria-modal="true"
            aria-labelledby="dialog-title"
            className={`  
                ${
                    showClosingAnimation
                        ? style.bottomSheetClosingAnimation
                        : style.bottomSheetOpeningAnimation
                }`}
        >
            <div id={'dialog-content-container'}>
                <div className=" fixed inset-0" aria-hidden="true" />

                {/* Full-screen scrollable container */}
                <div className="fixed inset-0 overflow-y-auto">
                    {/* Container to center the panel */}
                    <div className="relative flex min-h-full  flex-col items-center justify-end  overflow-x-hidden   ">
                        {/* bottom sheet container for the scroll up animation */}
                        <div
                            style={cssPosition || {}}
                            id={'bottom-sheet-transparent-position-container'}
                            className="  "
                        >
                            <div
                                style={{}}
                                className={`   ${style.bottomSheetAnimationContainer} ${
                                    showClosingAnimation
                                        ? style.bottomSheetDisappear
                                        : style.bottomSheetAppear
                                } `}
                                id={'bottom-sheet-animation-container'}
                            >
                                <div
                                    className={
                                        'relative flex h-full w-full flex-col items-stretch justify-end'
                                    }
                                    id={WRAPPER_DIV_ID}
                                >
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </dialog>
    );
};
