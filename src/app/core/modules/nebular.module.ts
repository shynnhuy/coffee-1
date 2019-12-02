import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbLayoutModule,
  NbActionsModule,
  NbSidebarModule,
  NbButtonModule,
  NbListModule,
  NbMenuModule,
  NbSpinnerModule,
  NbIconModule,
  NbCardModule,
  NbInputModule,
  NbTreeGridModule,
  NbSelectModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

const Nebular = [
  NbLayoutModule,
  NbEvaIconsModule,
  NbActionsModule,
  NbSidebarModule,
  NbButtonModule,
  NbListModule,
  NbMenuModule,
  NbSpinnerModule,
  NbIconModule,
  NbCardModule,
  NbInputModule,
  NbTreeGridModule,
  NbSelectModule
]

@NgModule({
  declarations: [],
  imports: [
    Nebular
  ],
  exports: [
    Nebular
  ]
})
export class NebularModule { }
