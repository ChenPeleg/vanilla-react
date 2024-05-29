import React, { useEffect } from 'react';
import styles from './Toast.module.css';
import { useWindowSize } from '../hooks/useWindowResize.ts';

export const Toast = ({
    show,
    setShow,
    children,
    className,
}: {
    show: boolean;
    setShow: (show: boolean) => void;
    children: React.ReactNode | ((closePopover: () => void) => React.ReactNode);
    className?: string;
}) => {
    const popOverRef = React.useRef<HTMLElement>(null);
    const buttonRef = React.useRef<HTMLDivElement>(null);
    const [innerHeight, innerWidth] = useWindowSize();
    const togglePopoverHandler = (
        e: Event & { newState: 'open' | 'close' }
    ) => {
        const isPopoverGoesOpen = e.newState === 'open';

        setShow(isPopoverGoesOpen);
    };

    useEffect(() => {
        popOverRef.current?.addEventListener(
            'beforetoggle',
            togglePopoverHandler as any
        );
        setPopoverPosition();
        const oldRef = popOverRef.current;
        return () => {
            oldRef?.removeEventListener(
                'beforetoggle',
                togglePopoverHandler as any
            );
        };
    }, [popOverRef]);
    useEffect(() => {
        show && setPopoverPosition();
    }, [innerHeight, innerWidth]);
    useEffect(() => {
        if (show) {
            const popover = popOverRef.current;
            popover && popover['showPopover'] && popover['showPopover']();
        } else
            setTimeout(() => {
                const popover = popOverRef.current;
                popover && popover['hidePopover'] && popover['hidePopover']();
            }, 200);
    }, [show]);
    const setPopoverPosition = () => {
        // if (!popOverRef.current || !buttonRef.current) {
        //     return;
        // }
        // const buttonRect = buttonRef.current?.getBoundingClientRect();
        // const popoverTop = buttonRect?.bottom || '300'; // + window.scrollY;
        // const popoverLeft = buttonRect?.left || '300'; // + window.scrollX;
        //
        // popOverRef.current.style.top = `${popoverTop}px`;
        // popOverRef.current.style.left = `${popoverLeft}px`;
    };

    const closeModal = () => {
        const popover = popOverRef.current;
        popover && popover['hidePopover'] && popover['hidePopover']();
    };
    return (
        <div
            className={'relative flex flex-row justify-center'}
            ref={buttonRef}
        >
            <div
                style={{
                    boxShadow: '0 1px 10px #0000001a, 0 2px 15px #0000000d',
                }}
                className={` rounded ${styles.popoverClass}   ${className}  `}
                // @ts-expect-error is supported in most browsers
                ref={popOverRef}
                id="app-popover"
                popover={'manual'}
            >
                {typeof children === 'function'
                    ? children(closeModal)
                    : children}
            </div>
        </div>
    );
};
