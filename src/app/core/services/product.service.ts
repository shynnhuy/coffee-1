import { Observable } from 'rxjs';
import { AppProduct } from './../models/product.model';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFirestore) { }

  getProducts(): Observable<AppProduct[]> {
    return this.db.collection<AppProduct>('products').valueChanges();
  }
}
