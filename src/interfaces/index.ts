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