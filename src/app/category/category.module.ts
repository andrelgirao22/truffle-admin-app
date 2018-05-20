import { SharedModule } from './../shared/shared.module';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { CategoryService } from './category.service';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CategoryComponent } from './category.component';
import { NgModule } from '@angular/core';

export const CATEGORY_ROUTES: Routes = [    
  {path: '', component: CategoryComponent },
  {path: 'categoryDetail', component: CategoryDetailComponent},
  {path: 'categoryDetail/:id', component: CategoryDetailComponent}
]

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(CATEGORY_ROUTES)
  ],
  declarations: [
    CategoryComponent,
    CategoryDetailComponent
  ],
  exports: [
    CategoryComponent,
    CategoryDetailComponent
  ]
})
export class CategoryModule { }
