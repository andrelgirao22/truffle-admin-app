import { CATEGORY_ROUTES } from './category.router';
import { SharedModule } from './../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { CategoryService } from './category.service';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CategoryComponent } from './category.component';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(CATEGORY_ROUTES)
  ],
  declarations: [
    CategoryComponent,
    CategoryDetailComponent
  ],
  exports: [
    CategoryComponent,
    CategoryDetailComponent,
    RouterModule
  ],
  providers: [
    CategoryService
  ]
})
export class CategoryModule { }
