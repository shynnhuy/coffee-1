import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppProduct, Brand } from './../models/product.model';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private db: AngularFirestore,
    private router: Router
  ) { }

  getBrands(): Observable<Brand[]> {
    return this.db.collection<Brand>('brand').valueChanges();
  }

  getProducts(): Observable<AppProduct[]> {
    return this.db.collection<AppProduct>('products', ref => ref.orderBy('createdAt')).valueChanges();
  }

  getProductById(id: string): Observable<AppProduct> {
    return this.db.doc<AppProduct>(`products/${id}`).valueChanges();
  }

  getListProducts(id: string): Observable<AppProduct[]> {
    return this.db.collection<AppProduct>('products', ref => ref.where('brand', '==', id)).valueChanges();
  }

  async createProduct(product) {
    const data = { ...product, createdAt: Date.now() }
    const result = await this.db.collection<AppProduct>(`products`).add(data);
    this.db.doc(`products/${result.id}`).set({
      id: result.id
    }, { merge: true });
    return this.router.navigate(['/acp/products']);
  }

  async updateProduct(id: string, data) {
    await this.db.doc(`products/${id}`).set({
      name: data.name,
      price: data.price,
      brand: data.brand,
      description: data.description,
      imageUrl: data.imageUrl,
      updatedAt: Date.now()
    }, { merge: true });

    return this.router.navigate(['/acp/products'])
  }

  deleteProduct(id) {
    const ref = this.db.collection('products').doc(id);
    ref.delete();
    // await this.db.doc(`products/${id}`).delete();
    console.log('Delete ' + id)
    return this.router.navigate(['/acp/products'])
  }

  // async deleteProduct(id) {

  //   let batch = this.db.firestore.batch();
  //   let ref = await this.db.doc(`products/${id}`);
  //   batch.delete(ref.ref)
  //   batch.commit();
  //   return this.router.navigate(['/acp/products'])
  // }
}
