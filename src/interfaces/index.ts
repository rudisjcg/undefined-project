export type StatusNotification = "error" | "success" | null;

export interface ItemData {
    item: {
        id: string;
        title: string;
        category: string;
        description: string;
        price: number;
        image: string;
    };
}