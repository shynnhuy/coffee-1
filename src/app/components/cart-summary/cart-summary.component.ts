import { Router } from '@angular/router';
import { CartModel } from 'src/app/core/models/cart.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss']
})
export class CartSummaryComponent implements OnInit {

  @Input('cart') cart: CartModel;
  isMobile = false;

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
    this.isMobile = this.getIsMobile();
    window.onresize = () => {
      this.isMobile = this.getIsMobile();
    };
  }

  getIsMobile(): boolean {
    const w = document.documentElement.clientWidth;
    const breakpoint = 860;
    if (w < breakpoint) {
      return true;
    } else {
      return false;
    }
  }

}
