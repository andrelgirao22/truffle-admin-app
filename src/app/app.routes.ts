import { OrderComponent } from './order/order.component';
import { ItemDetailComponent } from './item/item-detail/item-detail.component';
import { ItemComponent } from './item/item.component';
import { CategoryDetailComponent } from './category/category-detail/category-detail.component';
import { CategoryComponent } from './category/category.component';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';

export const ROUTES: Routes = [
    
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path :'category', component: CategoryComponent},
    {path: 'categoryDetail', component: CategoryDetailComponent},
    {path: 'categoryDetail/:id', component: CategoryDetailComponent},
    {path: 'item', component: ItemComponent},
    {path: 'itemDetail', component: ItemDetailComponent},
    {path: 'itemDetail/:id', component: ItemDetailComponent},
    {path: 'order', component: OrderComponent}
]