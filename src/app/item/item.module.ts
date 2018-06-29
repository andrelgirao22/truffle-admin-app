import { CurrencyMaskModule } from 'ng2-currency-mask';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './item.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';

import { TextMaskModule } from 'angular2-text-mask';

export const ITEM_ROUTES: Routes = [    
  {path: '', component: ItemComponent },
  {path: 'itemDetail', component: ItemDetailComponent},
  {path: 'itemDetail/:id', component: ItemDetailComponent}
]

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TextMaskModule,
    CurrencyMaskModule,
    RouterModule.forChild(ITEM_ROUTES)
  ],
  declarations: [
    ItemComponent,
    ItemDetailComponent
  ],
  exports: [
    ItemComponent,
    ItemDetailComponent
  ]
})
export class ItemModule { }
