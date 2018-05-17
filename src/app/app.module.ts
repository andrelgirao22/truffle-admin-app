import { CategoryService } from './category/category.service';
import { SharedModule } from './shared/shared.module';
import { ModalComponent } from './shared/modal/modal.component';
import { ItemService } from './item/item.service';

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
import { OrderComponent } from './order/order.component';
import { AccountComponent } from './account/account.component';
import { TokenInterceptor } from './login/token.interceptor';
import { LoggedInGuard } from './login/loggedin.guard';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ItemComponent,
    ItemDetailComponent,
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
    SharedModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    {provide:LOCALE_ID, useValue: "pt-BR" },
    LoginService,
    ItemService,
    NotificationService,
    LoggedInGuard,
    CategoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
