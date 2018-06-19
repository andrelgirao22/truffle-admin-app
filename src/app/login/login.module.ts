import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from './../shared/shared.module';
import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const ROUTES: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'login/:to', component: LoginComponent},
]


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    LoginComponent
  ], 
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
