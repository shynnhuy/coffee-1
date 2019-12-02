import { NebularModule } from './core/modules/nebular.module';
import { environment } from './../environments/environment';
import { CoreModule } from './core/modules/core.module';
import { MaterialsModule } from './core/modules/materials.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { NbThemeModule, NbLayoutModule, NbSidebarModule, NbMenuModule } from '@nebular/theme';
import { AdminNavComponent } from './components/admin-nav/admin-nav.component';
import { AdminFooterComponent } from './components/admin-footer/admin-footer.component';


import { registerLocaleData } from '@angular/common';
import localesVi from '@angular/common/locales/vi';

registerLocaleData(localesVi);

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    UserLayoutComponent,
    MainNavComponent,
    LoginComponent,
    SignupComponent,
    AdminNavComponent,
    AdminFooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialsModule,
    CoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireFunctionsModule,
    AngularFireStorageModule,
    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NebularModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'vi-VN'
    },],
  bootstrap: [AppComponent]
})
export class AppModule { }
