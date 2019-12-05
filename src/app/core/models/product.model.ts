export interface Brand {
    id: string,
    name: string,
    code?: string
};

export interface AppProduct {
    id: string,
    brand: string,
    name: string,
    price: number,
    description: string,
    imageUrl?: string,
    createdAt?: Date,
}