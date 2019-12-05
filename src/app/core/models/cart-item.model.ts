export class CartItemModel {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    brand: string;
    description: string;
    quantity: number;

    constructor(init?: Partial<CartItemModel>) {
        Object.assign(this, init);
    }
    
    get totalPrice() { return this.price * this.quantity; }
}