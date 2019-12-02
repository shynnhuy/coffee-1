import { NebularModule } from './../../core/modules/nebular.module';
import { CoreModule } from './../../core/modules/core.module';
import { MaterialsModule } from './../../core/modules/materials.module';
import { HomeComponent } from '../../pages/user-home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserLayoutRoutingModule } from './user-layout-routing.module';
import { UserProductDetailComponent } from '../../pages/user-product-detail/user-product-detail.component';


@NgModule({
  declarations: [
    HomeComponent,
    UserProductDetailComponent
  ],
  imports: [
    CommonModule,
    UserLayoutRoutingModule,
    CoreModule,
    MaterialsModule,
    NebularModule
  ]
})
export class UserLayoutModule { }
