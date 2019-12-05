import { NebularModule } from './../../core/modules/nebular.module';
import { CoreModule } from './../../core/modules/core.module';
import { MaterialsModule } from './../../core/modules/materials.module';
import { HomeComponent } from '../../pages/user-home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserLayoutRoutingModule } from './user-layout-routing.module';
import { UserProductDetailComponent } from '../../pages/user-product-detail/user-product-detail.component';
import { ProductQuantityComponent } from '../../components/product-quantity/product-quantity.component';
import { CartComponent } from 'src/app/pages/cart/cart.component';
import { NbThemeModule } from '@nebular/theme';
import { CartSummaryComponent } from '../../components/cart-summary/cart-summary.component';
import { CartBillingAddressComponent } from '../../components/cart-billing-address/cart-billing-address.component';
import { UserOrderSuccessComponent } from '../../pages/user-order-success/user-order-success.component';
import { UserOrderComponent } from '../../pages/user-order/user-order.component';


@NgModule({
  declarations: [
    HomeComponent,
    UserProductDetailComponent,
    CartComponent,
    ProductQuantityComponent,
    CartSummaryComponent,
    CartBillingAddressComponent,
    UserOrderSuccessComponent,
    UserOrderComponent
  ],
  imports: [
    CommonModule,
    UserLayoutRoutingModule,
    CoreModule,
    MaterialsModule,
    NebularModule,
  ]
})
export class UserLayoutModule { }
