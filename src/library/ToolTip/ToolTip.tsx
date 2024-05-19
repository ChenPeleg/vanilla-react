import React from 'react';

export const ToolTip = ({
    children,
    text,
    bgcolor,
}: {
    children: React.ReactNode;
    text: string | React.ReactNode;
    bgcolor?: string;
}) => {
    return (
        <div className="group relative  ">
            {text ? (
                <div
                    id={'tooltip-container'}
                    className={`invisible absolute -mt-11  flex  w-full flex-row justify-center
                     group-hover:visible`}
                >
                    <div
                        style={{
                            boxShadow:
                                '0 1px 10px #0000001a, 0 2px 15px #0000000d',
                            backgroundColor: bgcolor || 'white',
                        }}
                        className={` rounded  p-2 `}
                        id={'tooltip-content'}
                    >
                        <span>{text}</span>
                    </div>
                </div>
            ) : null}
            {children}
        </div>
    );
};
