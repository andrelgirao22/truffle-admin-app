import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { ReportProdComponent } from "./report-prod.component";

const ROUTES: Routes = [
    {path: '', component: ReportProdComponent}
]

@NgModule({
    imports:[
        CommonModule,
        SharedModule,
        RouterModule.forChild(ROUTES)
    ],
    declarations: [
        ReportProdComponent
    ],
    exports: [
        ReportProdComponent
    ]
})
export class ReportProdModule {

}