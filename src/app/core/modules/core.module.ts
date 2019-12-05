import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgbModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { HttpClientModule } from '@angular/common/http';

const Core = [
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
  FlexLayoutModule,
  Ng2SmartTableModule, 
  NgbModule,
  NgbDropdownModule,
  HttpClientModule
]

@NgModule({
  declarations: [],
  imports: [
    Core
  ],
  exports: [
    Core
  ]
})
export class CoreModule { }
