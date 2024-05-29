import React, { useEffect, useRef } from 'react';

/**
 * Hook that alerts clicks outside the passed ref
 */
function useOutsideHandler(
    ref: React.RefObject<HTMLElement>,
    outSideAlertHandler: () => void
) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event: React.MouseEvent) {
            if (
                ref?.current &&
                !ref.current.contains(event.target as HTMLElement)
            ) {
                typeof outSideAlertHandler === 'function' &&
                    outSideAlertHandler();
            }
        }

        // Bind the event listener
        // @ts-expect-error this is correct
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            // @ts-expect-error this is correct
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref]);
}

/**
 * Component that alerts if you click outside of it
 */
export const OutsideAlerter = ({
    children,
    outSideAlertHandler,
}: {
    children: React.ReactNode;
    outSideAlertHandler: () => void;
}) => {
    const wrapperRef = useRef(null);
    useOutsideHandler(wrapperRef, outSideAlertHandler);

    return (
        <div className={'flex'} id={'OutsideAlerter wrapper'} ref={wrapperRef}>
            {children}
        </div>
    );
};
