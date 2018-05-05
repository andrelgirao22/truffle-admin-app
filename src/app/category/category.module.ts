import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { CategoryService } from './category.service';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CategoryComponent } from './category.component';
import { NgModule } from '@angular/core';

const ROUTES: Routes = [
    /*{path :'category', component: CategoryComponent},
    {path: 'categoryDetail', component: CategoryDetailComponent},
    {path: 'categoryDetail/:id', component: CategoryDetailComponent},*/
]

@NgModule({
  imports: [
    CommonModule,
    //RouterModule.forChild(ROUTES)
  ],
  declarations: [
    CategoryComponent,
    CategoryDetailComponent
  ],
  exports: [
    CategoryComponent,
    CategoryDetailComponent
  ],
  providers: [
    CategoryService
  ]
})
export class CategoryModule { }
