import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { SharedModule } from '../shared/shared.module';
import { OrderService } from './order.service';

export const ROUTES: Routes = [    
  {path: '', component: OrderComponent }
]

console.log('Modulo Order Carregado')

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    OrderComponent
  ],
  providers: [
    OrderService
  ]
})
export class OrderModule {

  constructor() {}

}
