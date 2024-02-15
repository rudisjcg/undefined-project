export type StatusNotification = "error" | "success" | null;

export interface ItemData {
    item: {
        id: string;
        title: string;
        category: string;
        description: string;
        price: number;
        images: string[];
    };
}

export interface Query {
    $or?: Array<object>;
}

export interface ItemsArrayProps {
    item?: ItemsProduct[];
}

interface ItemsProduct {
    category: string;
    createdAt: string;
    description: string;
    email?: string;
    images?: string[];
    likes: any[]; // Replace `any` with the type of elements in the array if known
    listed: boolean;
    price: number;
    rating: number;
    title?: string;
    updatedAt: string;
    __v: number;
    _id: string;
}

interface Item {
    images?: Array<any>;
    listed: boolean;
    likes: Array<any>;
    price: number;
    rating: number;
    _id: string;
    email?: string;
    title?: string;
}

export type ItemsArray = Item[];

export type ItemsProductArray = ItemsProduct[];
