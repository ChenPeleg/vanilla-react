import { useEffect, useLayoutEffect, useState } from 'react';

export const UseMobileSizeDevelopmentOnly = (isDevelopment: boolean) => {
    const [mobilePhoneSize, setMobilePhoneSize] = useState<
        DOMRect | undefined
    >();

    function updateSize() {
        const mobilePhoneRect: DOMRect | undefined = document
            .getElementById('mobile-phone-borders')
            ?.getBoundingClientRect();
     
        if (mobilePhoneRect) {
            setMobilePhoneSize(mobilePhoneRect);
        }
    }

    useLayoutEffect(() => {
        window.addEventListener('resize', updateSize);

        if (!isDevelopment) {
            updateSize();
        }

        return () => {
            window.removeEventListener('resize', updateSize);
        };
    }, []);
    useEffect(() => {
        updateSize();
    }, []);
    return mobilePhoneSize;
};
