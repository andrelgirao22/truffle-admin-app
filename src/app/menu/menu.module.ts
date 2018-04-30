import { CategoryService } from './../category/category.service';
import { MENU_ROUTES } from './menu.routes';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MENU_ROUTES)
  ],
  declarations: [
    MenuComponent
  ],
  exports: [
    //RouterModule,
    MenuComponent
  ],
  providers: [
    CategoryService
  ]
})
export class MenuModule { }
