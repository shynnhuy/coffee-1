import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatIconModule,
  MatExpansionModule,
  MatTableModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatBadgeModule
} from '@angular/material'

const Material = [
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatIconModule,
  MatExpansionModule,
  LayoutModule,
  MatTableModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatBadgeModule
]

@NgModule({
  declarations: [],
  imports: [
    Material
  ],
  exports: [
    Material
  ]
})
export class MaterialsModule { }
