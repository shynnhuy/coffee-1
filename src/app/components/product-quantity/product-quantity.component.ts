import { CartService } from './../../core/services/cart.service';
import { CartModel } from './../../core/models/cart.model';
import { AppProduct } from './../../core/models/product.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.scss']
})
export class ProductQuantityComponent implements OnInit {

  @Input('product') product: AppProduct;
  @Input('cart') cart: CartModel;
  

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit() {
  }

  add() {
    this.cartService.addToCart(this.product);
  }

  remove() {
    this.cartService.removeFormCart(this.product);
  }

}
