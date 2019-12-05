import { AppProduct } from './product.model';
import { CartItemModel } from './cart-item.model';

export class CartModel {

    items: CartItemModel[] = [];

    constructor(private productsMap: CartItemModel[]) {
        for(let product of productsMap) {
            this.items.push(new CartItemModel(product))
        }
    }

    getQuantity(product: AppProduct) {
        for(let p of this.productsMap) {
            let item = p;
            if(item.id == product.id)
                return item ? item.quantity : 0
        }
        return 0;
    }

    get totalPrice() {
        let sum = 0;
        for (let productId in this.items)
            sum += this.items[productId].totalPrice;
        return sum;
    }

    get totalItemsCount() {
        let count = 0;
        for (let productId in this.items)
            count += this.items[productId].quantity;
        return count;
    }
}