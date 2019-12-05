import { FormsModule } from '@angular/forms';
import { AdminListProductsComponent } from './../../pages/admin-list-products/admin-list-products.component';
import { NebularModule } from './../../core/modules/nebular.module';
import { CoreModule } from './../../core/modules/core.module';
import { MaterialsModule } from './../../core/modules/materials.module';
import { AdminDashboardComponent } from './../../pages/admin-dashboard/admin-dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminLayoutRoutingModule } from './admin-layout-routing.module';
import { AdminListUsersComponent } from '../../pages/admin-list-users/admin-list-users.component';
import { AdminProductFormComponent } from '../../pages/admin-product-form/admin-product-form.component';
import { AdminListOrdersComponent } from '../../pages/admin-list-orders/admin-list-orders.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminListUsersComponent,
    AdminListProductsComponent,
    AdminProductFormComponent,
    AdminListOrdersComponent
  ],
  imports: [
    CommonModule,
    AdminLayoutRoutingModule,
    CoreModule,
    MaterialsModule,
    NebularModule,
    FormsModule
  ]
})
export class AdminLayoutModule { }
