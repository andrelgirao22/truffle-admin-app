import { LoggedInGuard } from './../login/logged.in.guard';
import { ItemService } from './../item/item.service';
import { CategoryService } from './../category/category.service';
import { LoginService } from './../login/login.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from './messages/snackbar/snackbar.component';
import { NgModule, ModuleWithProviders } from "@angular/core";
import { InputComponent } from "./input/input.component";
import { PaginationComponent } from './pagination/pagination.component';

import { CurrencyMaskModule } from 'ng2-currency-mask';
import { TextMaskModule } from 'angular2-text-mask';
import { ModalComponent } from './modal/modal.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CurrencyMaskModule,
        TextMaskModule
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
        TextMaskModule,
        ModalComponent
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
                LoggedInGuard
            ]
        }
    }

}