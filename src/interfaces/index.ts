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

export interface EditProductsProps {
    title?: string;
    price?: number;
    description?: string;
    category?: string;
    images?: string[]; // Assuming images is an array of strings
    _id?: string;
    [key: string]: any; // For the rest of the properties (existingData)
}

export type ItemsArray = Item[];

export type ItemsProductArray = ItemsProduct[];


export interface ResponseData {
    name?: string | null;
    email?: string | null;
    role?: string | null;
    id?: string | null;
    avatar?: string | null;
    phoneNumber?: string | null;
    verified?: boolean | null;
    postCreated?: number | null;
    comments?: number | null;
}

interface DynamicTemplateData {
    link: string;
    tittle: string;
}

export interface Message {
    to: string;
    from: string;
    templateId: string;
    dynamic_template_data: DynamicTemplateData;
}