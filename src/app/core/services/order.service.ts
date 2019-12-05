import { OrderModel } from './../models/order.model';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/core/services/cart.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  ordersRef: AngularFirestoreCollection<OrderModel>;

  constructor(
    private db: AngularFirestore,
    private cartService: CartService
  ) {
    this.ordersRef = db.collection<OrderModel>('orders');
  }

  getOrder(): Observable<OrderModel[]> {
    return this.ordersRef.valueChanges();
  }

  getOrderById(orderId: string) {
    return this.db.doc<OrderModel>(`orders/${orderId}`).valueChanges();
  }

  getOrderByUserId(userId: string) {
    return this.db.collection<OrderModel>('orders', ref => ref.where('userId', '==', userId)).valueChanges();
  }

  async storeOrder(order) {
    const result = await this.ordersRef.add(order);
    this.ordersRef.doc(`${result.id}`).set({
      orderId: result.id
    }, { merge: true });
    this.cartService.clearCart();
    return result;
  }

  changeStatus(orderId, status) {
    return this.db.doc(`orders/${orderId}`).set({
      status
    }, { merge: true });
  }
}
