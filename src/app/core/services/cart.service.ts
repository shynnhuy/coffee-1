import { CartItemModel } from './../models/cart-item.model';
import { AppProduct } from './../models/product.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CartModel } from '../models/cart.model';
import { HttpClient } from '@angular/common/http';

const PROVINCES = './assets/data/provinces.json';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private db: AngularFirestore,
    private userService: UserService,
    private http: HttpClient
  ) {
  }

  async create() {
    const result = await this.db.collection('carts').add({
      createdAt: new Date()
    });
    this.db.doc(`carts/${result.id}`).set({
      cartId: result.id
    }, { merge: true });
    return result.id
  }

  async getOrCreateCart(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    const user = this.userService.getUser();
    if (user) {
      let res = await this.create()
      localStorage.setItem('cartId', res);
      return res
    }
  }

  async getCart(): Promise<Observable<CartModel>> {
    let cartId = await this.getOrCreateCart();
    return this.db.doc(`carts/${cartId}`).collection<CartItemModel>('items').valueChanges()
      .pipe(map((x: any) => {
        // console.log(x);
        return new CartModel(x)
      }));
  }

  private getItems(cartId: string, productId: string) {
    return this.db.doc(`carts/${cartId}/items/${productId}`)
  }

  private async updateItemQuantity(product: AppProduct, change: number) {
    let cartId = await this.getOrCreateCart();
    let items$ = this.getItems(cartId, product.id);
    items$.valueChanges().pipe(take(1)).subscribe((item: any) => {
      if (item) {
        let quantity = (item.quantity || 0) + change;
        if (quantity === 0) {
          return items$.delete()
            .then(result => console.log(`${product.name} deleted`))
            .catch(err => console.log(err.message));
        }

        items$.set({
          ...product,
          quantity: quantity,
          lastUpdate: new Date()
        }, { merge: true })
      } else {
        items$.set({
          ...product,
          quantity: 1,
          addedAt: new Date()
        }, { merge: true })
      }
    })
  }

  addToCart(product: AppProduct) {
    const user = this.userService.getUser();
    if (user) {
      this.updateItemQuantity(product, 1);
      return true;
    }
    return false;
  }

  removeFormCart(product: AppProduct) {
    this.updateItemQuantity(product, -1);
    return true;
  }

  async clearCart() {
    let cartId = await this.getOrCreateCart();
    let batch = this.db.firestore.batch();
    let ref = await this.db.doc(`carts/${cartId}`).collection('items').ref.get();
    ref.forEach(doc => batch.delete(doc.ref));
    return batch.commit();
  }


  getProvinces() {
    return this.http.get(PROVINCES);
  }
}
