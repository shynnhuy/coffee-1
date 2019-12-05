import { Router, NavigationEnd } from '@angular/router';
import { AppProduct } from './../../core/models/product.model';
import { ProductService } from './../../core/services/product.service';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
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
  brands: Brand[];
  listItem: AppProduct[] = [];
  isLoading = false;

  constructor(
    private productService: ProductService,
    private breakpointObserver: BreakpointObserver,
    private router: Router,
  ) { }

  async ngOnInit() {
    this.productService.getBrands().subscribe(list => this.brands = list);
    // console.log(this.router.url.startsWith('/order-success'));
    
    if (this.router.url === '/cart' || this.router.url.startsWith('/order-success')) this.isHandset$ = of(true);
    this.router.events.subscribe((_: NavigationEnd) => {
      if (_.url === '/cart' || _.url === '/order-success')
        this.isHandset$ = of(true);
      else
        this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
          .pipe(
            map(result => result.matches),
            shareReplay()
          );
    })
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
