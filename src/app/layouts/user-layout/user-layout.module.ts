import { CoreModule } from './../../core/modules/core.module';
import { MaterialsModule } from './../../core/modules/materials.module';
import { HomeComponent } from '../../pages/user-home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserLayoutRoutingModule } from './user-layout-routing.module';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    UserLayoutRoutingModule,
    CoreModule,
    MaterialsModule
  ]
})
export class UserLayoutModule { }
