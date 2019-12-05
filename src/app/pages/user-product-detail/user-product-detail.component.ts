import { CartModel } from './../../core/models/cart.model';
import { CartService } from './../../core/services/cart.service';
import { AppProduct } from './../../core/models/product.model';
import { ProductService } from './../../core/services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-product-detail',
  templateUrl: './user-product-detail.component.html',
  styleUrls: ['./user-product-detail.component.scss']
})
export class UserProductDetailComponent implements OnInit {

  productId: string;
  product: AppProduct;
  cart: CartModel;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.productService.getProductById(params['id']).subscribe(p => this.product = p);
      }
    })

    this.cartService.getCart().then(res => {
      res.subscribe(list => this.cart = list)
    })
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

}
