import React from 'react';
import { Toast } from './Toast.tsx';
interface ToastConfig {
    duration?: number;
    id?: string;
    className?: string;
    position?: 'top' | 'bottom';
    content?: React.ReactNode | string;
}
export interface ToastProps {
    show: boolean;
    setShow: (content: React.ReactNode, config?: ToastConfig | number) => void;
    config: ToastConfig;
}

export const ToastContext = React.createContext<ToastProps>({
    show: false,
    setShow: () => {},
    config: {
        duration: 2000,
        className: '',
        position: 'top',
        id: '',
    },
});

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const [showToast, setShowToast] = React.useState(false);
    // const [toastQueue, setToastQueue] = React.useState<any[]>([]);
    const toastQueue = React.useRef({ queue: [] });
    const setToastQueue = (newQueue: any) =>
        (toastQueue.current.queue = newQueue);
    const [toastConfig, setToastConfig] = React.useState<ToastConfig>({
        duration: 2000,
        className: '',
        position: 'top',
        id: '',
        content: '',
    });
    const setShowToastHandler = (
        content?: React.ReactNode,
        config?: ToastConfig | number
    ) => {
        if (showToast) {
            setToastQueue([...toastQueue.current.queue, { content, config }]);
            return;
        }
        let newConfig = { ...toastConfig };
        if (typeof config === 'number') {
            newConfig = {
                ...toastConfig,
                duration: config,
                content: content || toastConfig.content,
            };
        } else if (typeof config === 'object') {
            newConfig = { ...toastConfig, ...config };
        }
        newConfig.content = content || toastConfig.content;
        setToastConfig(newConfig);
        setShowToast(true);
        const duration =
            typeof config === 'number'
                ? config
                : config?.duration || toastConfig.duration;
        setTimeout(() => {
            if (toastQueue.current.queue.length) {
                const { content, config } = toastQueue.current.queue[0];
                setToastQueue(toastQueue.current.queue.slice(1));
                setShowToastHandler(content, config);
            } else {
                // setToastQueue([]);
                setShowToast(false);
            }
        }, duration);
    };

    return (
        <>
            <ToastContext.Provider
                value={{
                    show: showToast,
                    setShow: setShowToastHandler,
                    config: toastConfig,
                }}
            >
                {showToast && (
                    <div>
                        <Toast
                            show={showToast}
                            setShow={setShowToast}
                            className={'relative top-12  mx-auto  shadow-xl'}
                        >
                            {(closePopover) => (
                                <div className={' h-14 bg-white p-4 pl-3 pr-6'}>
                                    <button
                                        className={
                                            'absolute right-1 top-1 h-5  w-5 rounded-full text-xs font-bold text-gray-500 hover:bg-gray-200  '
                                        }
                                        onClick={() => {
                                            setToastQueue([]);
                                            closePopover();
                                        }}
                                    >
                                        x
                                    </button>
                                    {toastConfig.content}
                                    {toastQueue.current.queue?.length ? (
                                        <div
                                            className={
                                                'absolute left-1 top-1 h-5  w-5 rounded-full text-xs font-bold text-gray-500 hover:bg-gray-200  '
                                            }
                                        >
                                            [{toastQueue.current.queue.length}]
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                </div>
                            )}
                        </Toast>
                    </div>
                )}
                {children}
            </ToastContext.Provider>
        </>
    );
};

export const useToast = () => {
    return React.useContext(ToastContext).setShow;
};
