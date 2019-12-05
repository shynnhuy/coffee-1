import { CartModel } from 'src/app/core/models/cart.model';
import { CartService } from './../../core/services/cart.service';
import { CartItemModel } from './../../core/models/cart-item.model';
import { TreeNode } from './../../core/models/treenode.model';
import { Observable, of } from 'rxjs';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NbTreeGridDataSource, NbSortDirection, NbTreeGridDataSourceBuilder, NbSortRequest, NbThemeService } from '@nebular/theme';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  isLoading = true;
  private cart$: Observable<CartModel>;
  cart: CartModel;
  
  constructor(
    private cartService: CartService,
  ) {
  }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
    this.cart$.subscribe(c => this.cart = c);
  }

}
