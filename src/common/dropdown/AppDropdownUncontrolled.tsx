import { MenuOption } from '../../models/MenuOption.ts';
import { AppDropdownControlled } from './AppDropdownControlled.tsx';
import React from 'react';

export const AppDropdownUncontrolled = ({
    options,
    updateField,
    defaultValue,
    config,
    disabled = false,
    name = 'appDropdownInputName',
}: {
    disabled?: boolean;
    options: MenuOption[];
    defaultValue: MenuOption | null;
    updateField: (option: MenuOption) => void;
    config?: {
        className?: string;
        width?: string | number;
    };
    name?: string;
}) => {
    const [selectedOption, setSelectedOption] =
        React.useState<MenuOption | null>(defaultValue);
    const updateFieldHandler = (option: MenuOption) => {
        setSelectedOption(option);
        updateField(option);
    };
    return (
        <AppDropdownControlled
            disabled={disabled}
            options={options}
            selectedOption={selectedOption}
            setSelectedOption={updateFieldHandler}
            config={config}
            name={name}
        />
    );
};
