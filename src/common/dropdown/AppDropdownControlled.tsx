import React from 'react';
import style from './AppDropdown.module.css';
import { OutsideAlerter } from '../tools/OutsideClickHandler.tsx';
import { MenuOption } from './MenuOption.ts';

export const AppDropdownControlled = ({
    options,
    selectedOption,
    setSelectedOption,
    config,
    disabled = false,
    defaultLabel = 'Select an option',
    name = 'appDropdownInputName',
}: {
    options: MenuOption[];
    selectedOption: MenuOption | null;
    setSelectedOption: (option: MenuOption) => void;
    defaultLabel?: string;
    config?: {
        className?: string;
        width?: string | number;
        customButton?: (props: {
            isOpen: boolean;
            buttonsClickHandler: (isOpen: boolean) => void;
        }) => React.ReactNode & {
            props: { buttonsClickHandler: () => void };
        };
    };
    disabled?: boolean;
    name?: string;
}) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const selectRef = React.useRef<HTMLSelectElement>(null);

    function optionClicked(event: React.MouseEvent, option: MenuOption) {
        event.preventDefault();
        if (disabled) {
            return;
        }
        setSelectedOption(option);
        setIsOpen(false);
    }

    return (
        <OutsideAlerter outSideAlertHandler={() => setIsOpen(false)}>
            <div className="relative inline-block text-left">
                <div>
                    {config?.customButton ? (
                        config?.customButton({
                            isOpen,
                            buttonsClickHandler: (ev) => setIsOpen(ev),
                        })
                    ) : (
                        <button
                            type="button"
                            style={{ width: config?.width + 'px' }}
                            className={`inline-flex flex-row items-center  justify-between gap-x-2 ${
                                !config?.width && ' w-full '
                            }
                    
                    rounded-md bg-white px-3 py-2   text-gray-900  
                    shadow-sm ring-1 ring-inset ring-gray-300  
                    ${disabled ? ' opacity-60 ' : ' hover:bg-gray-50 '}  `}
                            disabled={disabled}
                            id="menu-button"
                            aria-expanded="true"
                            aria-haspopup="true"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <div
                                className={
                                    'float-left inline-block   justify-start overflow-hidden  overflow-ellipsis  whitespace-nowrap  '
                                }
                            >
                                {selectedOption?.label ?? defaultLabel}
                            </div>
                            <div
                                style={{ paddingTop: '2px' }}
                                className={
                                    'flex h-full flex-col justify-center  '
                                }
                            >
                                <svg
                                    className="-mr-1 h-5 w-5 text-gray-400"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                        </button>
                    )}
                </div>

                <div
                    style={{ width: config?.width + 'px' }}
                    className={` ${style.DropDownWrapper} absolute right-0
                 z-10 mt-2 ${
                     !config?.width && ' w-56 '
                 }  origin-top-right rounded-md bg-white  
                shadow-lg ring-1 ring-black  ring-opacity-5   focus:outline-none  ${
                    isOpen ? style.fadeEnter : style.fadeOut
                } `}
                    role="menu"
                    aria-hidden={isOpen ? 'false' : 'true'}
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex={-1}
                >
                    <div className="py-1" role="none">
                        {options.map((option, index) => (
                            <div
                                onClick={(ev) => optionClicked(ev, option)}
                                key={option.id}
                                className={`block cursor-pointer px-4 py-2 
                                    text-start   text-gray-700
                                    hover:bg-gray-100 hover:text-gray-900
                                    ${
                                        selectedOption?.id === option.id
                                            ? 'bg-gray-200'
                                            : ''
                                    }
                                    `}
                                aria-selected={true}
                                role="menuitem"
                                tabIndex={-1}
                                id={`menu-item-${index}}`}
                            >
                                {option.label}
                            </div>
                        ))}
                    </div>
                </div>
                <select
                    role={'hidden'}
                    aria-hidden={'true'}
                    style={{ display: 'none' }}
                    onChange={() => null}
                    value={selectedOption?.id || undefined}
                    className={'hidden'}
                    ref={selectRef}
                    name={name}
                    id={name}
                >
                    {options.map((o) => (
                        <option
                            style={{ display: 'none' }}
                            aria-hidden={'true'}
                            key={o.id}
                            value={o.id}
                        >
                            {typeof o.label === 'string' ? o.label : o.id}
                        </option>
                    ))}
                </select>
            </div>
        </OutsideAlerter>
    );
};
