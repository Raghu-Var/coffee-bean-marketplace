export interface CoffeeBean {
    id: string;
    name: string;
    type: string; // e.g., Arabica, Robusta
    region: string;
    estate: string;
    vendor: string;
    price: number;
    grindSize: string; // e.g., Whole Bean, Coarse, Medium, Fine
}

export interface Region {
    id: string;
    name: string;
}

export interface Estate {
    id: string;
    name: string;
    regionId: string;
}

export interface Vendor {
    id: string;
    name: string;
    estateId: string;
}

export interface CartItem {
    coffeeBean: CoffeeBean;
    quantity: number;
}