export interface SubMenuItem {
    submenu_id: string;
    submenu_name: string;
    qty: number;
}

export interface MenuItem {
    menu_id: string;
    menu_name: string;
    qty: number;
    submenu?: SubMenuItem[];
}

export interface OrderType {
    id: string;
    queue_number: number;
    type: string;
    date: string;
    time: string;
    status: string;
    menu: MenuItem[];
}
