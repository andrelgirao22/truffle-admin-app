import { OrderService } from './../order/order.service';
import { LoggedInGuard } from './../login/logged.in.guard';
import { ItemService } from './../item/item.service';
import { CategoryService } from './../category/category.service';
import { LoginService } from './../login/login.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from './messages/snackbar/snackbar.component';
import { NgModule, ModuleWithProviders } from "@angular/core";
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { InputComponent } from "./input/input.component";
import { PaginationComponent } from './pagination/pagination.component';

import { CurrencyMaskModule } from 'ng2-currency-mask';
import { ModalComponent } from './modal/modal.component';

import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { TaskService } from './tasks/task.service';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CurrencyMaskModule,
        NgxDaterangepickerMd,
        PdfViewerModule
    ],
    declarations: [
        InputComponent,
        SnackbarComponent,
        PaginationComponent,
        ModalComponent
    ],
    exports: [
        InputComponent,
        SnackbarComponent,
        PaginationComponent,
        FormsModule, 
        ReactiveFormsModule,
        CurrencyMaskModule,
        NgxDaterangepickerMd,
        ModalComponent,
        PdfViewerModule
    ]
})
export class SharedModule {

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                LoginService,
                CategoryService,
                ItemService,
                LoggedInGuard,
                TaskService,
                OrderService
            ]
        }
    }
}

//platformBrowserDynamic().bootstrapModule(SharedModule);