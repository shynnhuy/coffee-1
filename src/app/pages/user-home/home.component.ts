import { CartModel } from './../../core/models/cart.model';
import { CartService } from './../../core/services/cart.service';
import { AppProduct } from './../../core/models/product.model';
import { ProductService } from './../../core/services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  listProducts: AppProduct[];
  cart: CartModel;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(list => this.listProducts = list);
    this.cartService.getCart().then(res => {
      res.subscribe(list => this.cart = list);
    })
  }

}
