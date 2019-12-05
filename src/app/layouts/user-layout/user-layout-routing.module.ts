import { UserOrderComponent } from './../../pages/user-order/user-order.component';
import { UserProductDetailComponent } from './../../pages/user-product-detail/user-product-detail.component';
import { HomeComponent } from '../../pages/user-home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from 'src/app/pages/cart/cart.component';
import { UserOrderSuccessComponent } from 'src/app/pages/user-order-success/user-order-success.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'cart',
    component: CartComponent
  },
  { path: 'home', component: HomeComponent },
  { path: 'home/:id', component: UserProductDetailComponent },
  { path: 'order-success/:id', component: UserOrderSuccessComponent },
  { path: 'order', component: UserOrderComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserLayoutRoutingModule { }
