
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule
    //RouterModule.forChild(MENU_ROUTES)
  ],
  declarations: [
    MenuComponent
  ],
  exports: [
    MenuComponent
  ],
  providers: []
})
export class MenuModule { }
