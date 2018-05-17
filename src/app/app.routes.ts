import { LoggedInGuard } from './login/loggedin.guard';
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
    {path: 'login/:to', component: LoginComponent},
    {path: 'login', component: LoginComponent},
    {path: 'category', loadChildren: './category/category.module#CategoryModule'},
    {path: 'item', component: ItemComponent, canLoad: [LoggedInGuard]},
    {path: 'itemDetail', component: ItemDetailComponent, canLoad: [LoggedInGuard]},
    {path: 'itemDetail/:id', component: ItemDetailComponent, canLoad: [LoggedInGuard]},
    {path: 'order', component: OrderComponent, canLoad: [LoggedInGuard]}
]