import { Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';

export const ROUTES: Routes = [
    {path: '', component: LoginComponent},
    {path: 'menu', component: MenuComponent }
]