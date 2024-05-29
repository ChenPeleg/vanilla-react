import React from 'react';
import styles from './MobilePhone.module.css';
import { ScreenTypes } from './MobileScreenWrapper.tsx';

const FigmaLink = ({ link }: { link: string }) => {
    return (
        <div className={'flex h-10 w-5 flex-col justify-center '}>
            <a
                href={link}
                target={'_blank'}
                rel={'noreferrer'}
                className={'text-blue-500 underline'}
            >
                <svg
                    className={'  w-4'}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 38 57"
                >
                    <path
                        fill="#1abcfe"
                        d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0"
                    ></path>
                    <path
                        fill="#0acf83"
                        d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0"
                    ></path>
                    <path
                        fill="#ff7262"
                        d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19z"
                    ></path>
                    <path
                        fill="#f24e1e"
                        d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5"
                    ></path>
                    <path
                        fill="#a259ff"
                        d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5"
                    ></path>
                </svg>
            </a>
        </div>
    );
};
const SCREEN_TYPE_LS_KEY = 'selectedScreenType_key';

const ScreenTypeButtons = ({
    screenTypes,
    selectedScreenType,
    setSelectedScreenType,
}: {
    screenTypes: ScreenTypes;
    selectedScreenType: string;
    setSelectedScreenType: (screenType: string) => void;
}) => {
    // @ts-expect-error this is always a number
    const screenXDimensions = screenTypes.find(
        (screenType) => screenType.name === selectedScreenType
    ).x as number;

    return (
        <div
            style={{ transition: 'height 0.4s ease, width 0.4s ease' }}
            className={' mb-4'}
        >
            <div
                style={{ width: screenXDimensions }}
                className={'flex    flex-row  justify-center '}
            >
                <div className={'flex  flex-row gap-3'}>
                    {screenTypes.map((screenType) => (
                        <button
                            title={`${screenType.name} (${screenType.x} x ${screenType.y})`}
                            key={screenType.name}
                            className={`text-md rounded-md bg-amber-50   px-3 py-1 ${screenType.name === selectedScreenType ? ' bg-amber-500 font-extrabold ' : ''} `}
                            onClick={() =>
                                setSelectedScreenType(screenType.name)
                            }
                        >
                            {screenType.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export const MobilePhone = ({
    children,
    figmaLink,
    screenTypes,
}: {
    screenTypes: ScreenTypes;
    children: React.ReactNode;
    figmaLink?: string;
}) => {
    const [selectedScreenType, setSelectedScreenType] = React.useState(
        localStorage.getItem(SCREEN_TYPE_LS_KEY) || screenTypes[0].name
    );

    const updateScreenType = (screenType: string) => {
        setSelectedScreenType(screenType);
        localStorage.setItem(SCREEN_TYPE_LS_KEY, screenType);
    };

    // @ts-expect-error this is always a number
    const screenXDimensions = screenTypes.find(
        (screenType) => screenType.name === selectedScreenType
    ).x as number;
    const dimentionsWithBordersAndMargin = 1.06 * screenXDimensions;
    const styleProps: React.CSSProperties = {
        '--size-ratio': dimentionsWithBordersAndMargin / 320,
    } as React.CSSProperties;

    return (
        <div style={styleProps}>
            <div className={'flex flex-row'}>
                <ScreenTypeButtons
                    screenTypes={screenTypes}
                    selectedScreenType={selectedScreenType}
                    setSelectedScreenType={updateScreenType}
                />
                <FigmaLink link={figmaLink || ''} />
            </div>

            <div className="mobile-phone">
                <div className={styles.phone} id={'mobile-phone-borders'}>
                    <div
                        className={`${styles.phoneButton}  ${styles.phoneButton1}`}
                        id="phone-btn-1"
                    ></div>
                    <div
                        className={`${styles.phoneButton} ${styles.phoneButton2}`}
                        id="phone-btn-2"
                    ></div>
                    <div
                        className={`${styles.phoneButton} ${styles.phoneButton3}`}
                        id="phone-btn-3"
                    ></div>
                    <div className={styles.screen}>
                        <div
                            className={
                                ' mt-3 h-full w-full   overflow-y-scroll'
                            }
                        >
                            <div
                                id={'mobile-screen-content-wrapper'}
                                style={{ borderRadius: '20px' }}
                                className={
                                    'absolute  h-[98.2%] w-[99.9%]   overflow-y-hidden rounded-t-lg '
                                }
                            >
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
