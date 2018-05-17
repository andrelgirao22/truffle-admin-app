import { Routes } from '@angular/router';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CategoryComponent } from './category.component';

export const CATEGORY_ROUTES: Routes = [
    
    {path :'', component: CategoryComponent},
    {path: 'categoryDetail', component: CategoryDetailComponent},
    {path: 'categoryDetail/:id', component: CategoryDetailComponent}
]