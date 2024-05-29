import React, { useEffect } from 'react';
import styles from './Popover.module.css';
import { useWindowSize } from '../hooks/useWindowResize.ts';
import { sleep } from '../tools/sleep.ts';

export const Popover = ({
    button,
    children,
    closeOnBlur = true,
    className = '',
    style,
    relativePosition = { xOffset: 0, yOffset: 0 },
}: {
    button?: React.ReactNode;
    children: React.ReactNode | ((closePopover: () => void) => React.ReactNode);
    closeOnBlur?: boolean;
    className?: string;
    style?: React.CSSProperties;
    relativePosition?: { xOffset?: number; yOffset?: number };
}) => {
    const popOverRef = React.useRef<HTMLElement>(null);
    const buttonRef = React.useRef<HTMLDivElement>(null);
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const [innerHeight, innerWidth] = useWindowSize();
    const togglePopoverHandler = (
        e: Event & { newState: 'open' | 'close' }
    ) => {
        const isPopoverGoesOpen = e.newState === 'open';

        setIsPopoverOpen(isPopoverGoesOpen);
    };

    useEffect(() => {
        popOverRef.current?.addEventListener(
            'beforetoggle',
            togglePopoverHandler as any
        );
        setPopoverPosition();
        return () => {
            popOverRef.current?.removeEventListener(
                'beforetoggle',
                togglePopoverHandler as any
            );
        };
    }, [popOverRef]);
    useEffect(() => {
        isPopoverOpen && setPopoverPosition();
    }, [innerHeight, innerWidth]);

    useEffect(() => {
        sleep(1000).then(setPopoverPosition);
    }, []);

    const setPopoverPosition = () => {
        if (!popOverRef.current || !buttonRef.current) {
            return;
        }
        const buttonRect = buttonRef.current?.getBoundingClientRect();
        const buttonTop = (buttonRect?.bottom || 0) + window.scrollY;
        const buttonLeft = (buttonRect?.left || 0) + window.scrollX;

        popOverRef.current.style.top = `${
            buttonTop + (relativePosition.yOffset || 0)
        }px`;

        popOverRef.current.style.right = '';
        popOverRef.current.style.left = `${
            buttonLeft + (relativePosition.xOffset || 0)
        }px`;
    };

    const handleButtonClick = (
        ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        ev.preventDefault();
        const popover = popOverRef.current;
        popover && popover.showPopover();
        if (isPopoverOpen) {
            popover && popover.hidePopover();
        } else {
            popover && popover.showPopover();
        }
    };

    const closeModal = () => {
        const popover = popOverRef.current;
        popover && popover['hidePopover'] && popover['hidePopover']();
    };
    return (
        <div id={'popover-component-root'} className={'relative h-full w-full'}>
            <div
                className={' absolute top-0'}
                id={'button-wrapper'}
                ref={buttonRef}
                // @ts-expect-error is supported in most browsers 2222
                onClick={(ev) => handleButtonClick(ev)}
            >
                {button || (
                    <button
                        className={
                            'w-22   rounded  bg-amber-500 p-2 text-sm font-semibold shadow-sm'
                        }
                    >
                        Show modal
                    </button>
                )}
            </div>

            <div
                className={` ${styles.popoverClass}  relative  ${className}`} // ${className}
                // @ts-expect-error is supported in most browsers
                ref={popOverRef}
                id="app-popover"
                popover={closeOnBlur ? 'auto' : 'manual'}
                style={style}
            >
                <div className={` `}>
                    {typeof children === 'function'
                        ? children(closeModal)
                        : children}
                </div>
            </div>
        </div>
    );
};
