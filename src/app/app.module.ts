import { ModalComponent } from './shared/modal/modal.component';
import { ItemService } from './item/item.service';
import { CategoryService } from './category/category.service';
import { CategoryDetailComponent } from './category/category-detail/category-detail.component';
import { CategoryComponent } from './category/category.component';
import { CategoryModule } from './category/category.module';
import { NotificationService } from './shared/messages/notification.service';
import { LoginService } from './login/login.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';

import {LOCALE_ID} from '@angular/core'
import localePt from '@angular/common/locales/pt'
import { registerLocaleData } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MenuModule } from './menu/menu.module';
import { ItemComponent } from './item/item.component';
import { ItemDetailComponent } from './item/item-detail/item-detail.component';
import { InputComponent } from './shared/input/input.component';
import { SnackbarComponent } from './shared/messages/snackbar/snackbar.component';
import { OrderComponent } from './order/order.component';
import { AccountComponent } from './account/account.component';
import { TokenInterceptor } from './login/token.interceptor';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CategoryComponent,
    CategoryDetailComponent,
    ItemComponent,
    ItemDetailComponent,
    InputComponent,
    ModalComponent,
    SnackbarComponent,
    OrderComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MenuModule,
    //CategoryModule,
    RouterModule.forRoot(ROUTES)
  ],
  exports: [],
  providers: [
    {provide:LOCALE_ID, useValue: "pt-BR" },
    LoginService,
    CategoryService,
    ItemService,
    NotificationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
