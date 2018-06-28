import { LoggedInGuard } from './login/logged.in.guard';
import { OrderComponent } from './order/order.component';
import { ItemDetailComponent } from './item/item-detail/item-detail.component';
import { ItemComponent } from './item/item.component';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    
    {path: 'login', loadChildren: './login/login.module#LoginModule'},
    {path: '', component: HomeComponent, canActivate: [LoggedInGuard]},
    {path: 'category', loadChildren: './category/category.module#CategoryModule', canActivate: [LoggedInGuard]},
    {path: 'item', loadChildren: './item/item.module#ItemModule', canActivate: [LoggedInGuard]},
    {path: 'order', component: OrderComponent, canActivate: [LoggedInGuard]}
]