import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { AppUser } from 'src/app/core/models/user.model';
import { CartModel } from 'src/app/core/models/cart.model';
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

  ngOnInit() {
    this.authService.appUser$.subscribe(user => this.appUser = user);
    this.cartService.getCart().then(res => {
      res.subscribe(list => this.cart = list)
    })
  }

  onLogout() {
    this.authService.logout();
  }
}
