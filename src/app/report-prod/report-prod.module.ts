import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { ReportProdComponent } from "./report-prod.component";
import { ReportService } from "../services/report.service";

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
    ],
    providers: [ReportService]
})
export class ReportProdModule {

}