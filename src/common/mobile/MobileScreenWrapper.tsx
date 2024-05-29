import React from 'react';
import { MobilePhone } from './MobilePhone.tsx';
import { useWindowSize } from '../hooks/useWindowResize.ts';

export type ScreenTypes = Array<{
    name: string;
    x: number;
    y: number;
}>;
export const MobileScreenWrapper = ({
    screenTypes,
    children,
    showPhoneFrame = false,
    figmaLink,
}: {
    screenTypes: ScreenTypes;
    children: React.ReactNode;
    showPhoneFrame?: boolean;
    figmaLink?: string;
}) => {
    const [windowWidth, windowHeight] = useWindowSize();
    // x buffer to show the mobile phone frame
    if (windowWidth < screenTypes[0].x + 250) {
        showPhoneFrame = false;
    }
    return (
        <div className={'flex flex-row justify-center'}>
            <div
                id={'max-mobile-size-limiter'}
                style={{
                    width: showPhoneFrame ? '' : `${windowWidth}px`,
                    height: showPhoneFrame ? '' : `${windowHeight}px`,
                    maxWidth: showPhoneFrame
                        ? screenTypes[screenTypes.length - 1].x + 50
                        : '',
                    // maxHeight: showPhoneFrame
                    //     ? screenTypes[screenTypes.length - 1].y + 50
                    //     : '',
                }}
                className={`bg-transparent p-1 ${showPhoneFrame ? '' : '  max-h-[844px] max-w-[480px]'}`}
            >
                {showPhoneFrame ? (
                    <MobilePhone
                        screenTypes={screenTypes}
                        figmaLink={figmaLink}
                    >
                        {children}
                    </MobilePhone>
                ) : (
                    <>{children}</>
                )}
            </div>
        </div>
    );
};
