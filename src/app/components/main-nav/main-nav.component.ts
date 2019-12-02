import { CartModel } from './../../core/models/cart.model';
import { CartService } from './../../core/services/cart.service';
import { AppProduct } from './../../core/models/product.model';
import { ProductService } from './../../core/services/product.service';
import { AppUser } from './../../core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { Component, OnInit, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { EventEmitter } from 'events';
import { Brand } from 'src/app/core/models/product.model';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  cart$: Observable<CartModel>;
  cart: CartModel;
  appUser: AppUser;
  brands: Brand[];
  listItem: AppProduct[] = [];
  isLoading = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private productService: ProductService,
    private cartService: CartService
  ) { }

  async ngOnInit() {
    this.authService.appUser$.subscribe(user => this.appUser = user);
    this.productService.getBrands().subscribe(list => this.brands = list);
    this.cart$ = await this.cartService.getCart()
    this.cart$.subscribe(list => this.cart = list);
  }

  onLogout() {
    this.authService.logout();
  }

  getList(b) {
    this.isLoading = true;
    this.productService.getListProducts(b.id).subscribe(list => {
      setTimeout(() => {
        this.listItem = list;
        this.isLoading = false;
      }, 2000);
    })
  }

}
