import { ReactNode } from 'react';

export interface MenuOption {
    label: string | ReactNode;
    id: string | number;
    data?: any;
    icon?: string;
}
