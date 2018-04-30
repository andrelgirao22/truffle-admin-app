import { CategoryDetailComponent } from './../category/category-detail/category-detail.component';
import { CategoryComponent } from './../category/category.component';
import { HomeComponent } from './../home/home.component';
import { Routes } from '@angular/router';

export const MENU_ROUTES: Routes = [
    
    //{path: 'menu', component: HomeComponent},
    {path: 'category', component: CategoryComponent},
    {path: 'categoryDetail', component: CategoryDetailComponent},
    {path: 'categoryDetail/:id', component: CategoryDetailComponent}
]