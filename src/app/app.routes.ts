import { LoggedInGuard } from './login/logged.in.guard';
import { OrderComponent } from './order/order.component';
import { ItemDetailComponent } from './item/item-detail/item-detail.component';
import { ItemComponent } from './item/item.component';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    
    {path: 'login', loadChildren: './login/login.module#LoginModule'},
    {path: 'home', component: HomeComponent, canActivate: [LoggedInGuard]},
    {path: 'category', loadChildren: './category/category.module#CategoryModule', canActivate: [LoggedInGuard]},
    {path: 'item', component: ItemComponent, canActivate: [LoggedInGuard]},
    {path: 'itemDetail', component: ItemDetailComponent, canActivate: [LoggedInGuard]},
    {path: 'itemDetail/:id', component: ItemDetailComponent, canActivate: [LoggedInGuard]},
    {path: 'order', component: OrderComponent, canActivate: [LoggedInGuard]}
]