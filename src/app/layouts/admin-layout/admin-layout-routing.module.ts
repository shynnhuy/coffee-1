import { AdminProductFormComponent } from './../../pages/admin-product-form/admin-product-form.component';
import { AdminListUsersComponent } from './../../pages/admin-list-users/admin-list-users.component';
import { AdminDashboardComponent } from './../../pages/admin-dashboard/admin-dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminListProductsComponent } from 'src/app/pages/admin-list-products/admin-list-products.component';


const routes: Routes = [
  { path: '', redirectTo: 'dashboard' },
  { path: 'dashboard', component: AdminDashboardComponent },
  { path: 'users', component: AdminListUsersComponent },
  { path: 'products', component: AdminListProductsComponent },
  { path: 'products/new', component: AdminProductFormComponent },
  { path: 'products/:id', component: AdminProductFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }
