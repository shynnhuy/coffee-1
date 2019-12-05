import { Router } from '@angular/router';
import { OrderModel } from './../../core/models/order.model';
import { AuthService } from './../../core/services/auth.service';
import { OrderService } from './../../core/services/order.service';
import { CartModel } from './../../core/models/cart.model';
import { Observable, Subscription } from 'rxjs';
import { CartService } from 'src/app/core/services/cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-cart-billing-address',
  templateUrl: './cart-billing-address.component.html',
  styleUrls: ['./cart-billing-address.component.scss']
})
export class CartBillingAddressComponent implements OnInit, OnDestroy {
  provinces;
  cProvince;
  cCity;

  cart$: Observable<CartModel>;
  cart: CartModel;
  userId: string;
  cartSubscription: Subscription;
  userSubscription: Subscription;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
    this.cartService.getProvinces().subscribe(list => {
      this.provinces = list;
    });
    this.cartSubscription = this.cart$.subscribe(cart => this.cart = cart);
    this.userSubscription = this.authService.appUser$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  async save(value) {
    const { fullName, email, address, province, city } = value;
    const shipping = {
      fullName,
      email,
      address,
      city,
      province: this.provinces[province].name,
    };
    let order = new OrderModel(this.userId, shipping, this.cart);
    const result = await this.orderService.storeOrder({...order});
    this.router.navigate(['/order-success', result.id]);
  }

}
