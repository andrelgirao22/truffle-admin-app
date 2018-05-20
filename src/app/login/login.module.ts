import { Routes, RouterModule } from '@angular/router';

import { Route } from '@angular/compiler/src/core';
import { SharedModule } from './../shared/shared.module';
import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
