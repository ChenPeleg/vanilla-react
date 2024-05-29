import { useLayoutEffect, useState } from 'react';

/**
 * Returns the current window size as an array of two numbers.
 * @return {number[]}
 */
export const useWindowSize = (): number[] => {
    const [size, setSize] = useState([0, 0]);

    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }

        window.addEventListener('resize', updateSize);
        updateSize();
        return () => {
            window.removeEventListener('resize', updateSize);
        };
    }, []);
    return size;
};
