import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { AccountComponent } from "./account.component";
import { Routes, RouterModule } from "@angular/router";

export const ACCOUNT_ROUTES: Routes = [
    {path: '', component: AccountComponent}
]

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(ACCOUNT_ROUTES)
    ],
    declarations: [
        AccountComponent,
    ],
    exports: [
        AccountComponent
    ]
})
export class AccountModule {

}