import { useEffect, useRef } from 'react';

/**
 * useInterval hook base on Dan Abramov's hook
 * @param {()=>void} callback
 * @param {number} delayInMilliseconds
 */
export const useInterval = (
    callback: () => void,
    delayInMilliseconds: number
) => {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        // @ts-expect-error stores the callback
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            // @ts-expect-error stores the callback
            savedCallback.current();
        }
        if (delayInMilliseconds !== null) {
            const id = setInterval(tick, delayInMilliseconds);
            return () => clearInterval(id);
        }
    }, [delayInMilliseconds]);
};
