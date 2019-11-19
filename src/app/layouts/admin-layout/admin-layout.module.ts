import { MaterialsModule } from './../../core/modules/materials.module';
import { AdminDashboardComponent } from './../../pages/admin-dashboard/admin-dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminLayoutRoutingModule } from './admin-layout-routing.module';


@NgModule({
  declarations: [
    AdminDashboardComponent
  ],
  imports: [
    CommonModule,
    AdminLayoutRoutingModule,
    MaterialsModule
  ]
})
export class AdminLayoutModule { }
