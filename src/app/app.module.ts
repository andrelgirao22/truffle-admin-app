import { LoginService } from './login/login.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { CategoryComponent } from './category/category.component';
import { LoginComponent } from './login/login.component';
import { InputComponent } from './shared/input/input.component';
import { MenuComponent } from './menu/menu.component';

import {LOCALE_ID} from '@angular/core'
import localePt from '@angular/common/locales/pt'
import { registerLocaleData } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MenuModule } from './menu/menu.module';
import { CategoryDetailComponent } from './category/category-detail/category-detail.component';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    LoginComponent,
    InputComponent,
    HomeComponent,
    CategoryDetailComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    MenuModule
  ],
  providers: [
    {provide:LOCALE_ID, useValue: "pt-BR" },
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
