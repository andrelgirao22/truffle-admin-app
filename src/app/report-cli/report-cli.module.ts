import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { ReportCliComponent } from "./report-cli.component";
import { ReportService } from "../services/report.service";

const ROUTES: Routes = [
    {path: '', component: ReportCliComponent}
]

@NgModule({
    imports:[
        CommonModule,
        SharedModule,
        RouterModule.forChild(ROUTES)
    ],
    declarations: [
        ReportCliComponent
    ],
    exports: [
        ReportCliComponent
    ],
    providers: [ReportService]
})
export class ReportCliModule {

}