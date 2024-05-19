import React from 'react';

export interface MenuProps {
    children:
        | React.ReactNode
        | ((childrenProps: {
              close: () => void;
              isOpen: boolean;
          }) => React.ReactNode);
}
export interface MenuItemData {
    label: string | React.ReactNode;
    id: string;
    data: any;
}

/**
 * TODO: add documentation, connect to the rest of the components, connect buttons
 */

const MenuContext = React.createContext<{
    selectedItem: MenuItemData | null;
    isOpen: boolean;
    setSelectedItem: (item: MenuItemData) => void;
    setIsOpen: (isOpen: boolean | ((previousState: any) => boolean)) => void;
}>({
    selectedItem: null,
    isOpen: false,
    setSelectedItem: () => null,
    setIsOpen: () => null,
});
const MenuButton = ({ children }: { children: React.ReactNode }) => {
    const { setIsOpen } = React.useContext(MenuContext);
    const clickButtonHandler = () => {
        setIsOpen((previousState: boolean) => !previousState);
    };
    return (
        <div role={'button'} onClick={clickButtonHandler}>
            {children}
        </div>
    );
};
const MenuItem = ({
    children,
    menuItemData,
}: {
    children: React.ReactNode;
    menuItemData: MenuItemData;
}) => {
    const { setIsOpen, setSelectedItem } = React.useContext(MenuContext);
    const clickButtonHandler = () => {
        setSelectedItem(menuItemData);
        setIsOpen(true);
    };
    return (
        <div id={'menu-item-data'} onClick={clickButtonHandler}>
            {children}
        </div>
    );
};
function Menu({ children }: MenuProps) {
    const [selectedItem, setSelectedItem] = React.useState<MenuItemData | null>(
        null
    );
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    return (
        <MenuContext.Provider
            value={{
                selectedItem,
                setSelectedItem,
                isOpen,
                setIsOpen,
            }}
        >
            <div>
                {typeof children === 'function'
                    ? children({ close, isOpen })
                    : children}
            </div>
        </MenuContext.Provider>
    );
}
Menu.Button = MenuButton;
Menu.Item = MenuItem;
export { Menu };
