import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { AccountComponent } from "./account.component";
import { Routes, RouterModule } from "@angular/router";
import { AccountDetailComponent } from './account-detail/account-detail.component';

export const ACCOUNT_ROUTES: Routes = [
    {path: '', component: AccountComponent},
    {path: 'detail', component: AccountDetailComponent},
    {path: 'detail/:id', component: AccountDetailComponent}
]

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(ACCOUNT_ROUTES)
    ],
    declarations: [
        AccountComponent,
        AccountDetailComponent,
    ],
    exports: [
        AccountComponent,
        AccountDetailComponent
    ]
})
export class AccountModule {

}