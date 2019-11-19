import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgbModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

const Core = [
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
  FlexLayoutModule,
  NgbModule,
  NgbDropdownModule
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
