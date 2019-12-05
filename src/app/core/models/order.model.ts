import { CartModel } from './cart.model';
export class OrderModel {
    datePlaced: number;
    items: any[];
    status: string;
    constructor(
        public userId: string,
        public shipping: any,
        cart: CartModel
    ) {
        this.datePlaced = new Date().getTime();
        this.items = cart.items.map(i => {
            return {
                product: {
                    name: i.name,
                    imageUrl: i.imageUrl,
                    price: i.price
                },
                quantity: i.quantity,
                totalPrice: i.totalPrice
            }
        });
        this.status = 'pending';
    }
}