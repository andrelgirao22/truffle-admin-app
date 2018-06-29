import { httpInterceptorProviders } from './interceptors/index';
import { LoggedInGuard } from './login/logged.in.guard';
import { NotificationService } from './shared/messages/notification.service';
import { LoginModule } from './login/login.module';
import { SharedModule } from './shared/shared.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import { AppComponent } from './app.component';

import {LOCALE_ID} from '@angular/core'
import localePt from '@angular/common/locales/pt'
import { registerLocaleData } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MenuModule } from './menu/menu.module';
import { OrderComponent } from './order/order.component';
import { AccountComponent } from './account/account.component';

import { TextMaskModule } from 'angular2-text-mask';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OrderComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule.forRoot(),
    LoginModule,
    MenuModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    {provide:LOCALE_ID, useValue: "pt-BR" },
    NotificationService,
    LoggedInGuard,
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
