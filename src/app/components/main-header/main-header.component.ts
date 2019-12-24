import { CartModel } from './../../core/models/cart.model';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { AppUser } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {

  @Input('drawer') drawer;
  appUser: AppUser;
  cart$: Observable<CartModel>
  cart: CartModel;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private cartService: CartService
  ) { }

  async ngOnInit() {
    this.authService.appUser$.subscribe(user => this.appUser = user);
    this.cart$ = await this.cartService.getCart();
    this.cart$.subscribe(res => this.cart = res)
  }

  onLogout() {
    this.authService.logout();
  }
}
