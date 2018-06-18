import { LoggedInGuard } from './../login/logged.in.guard';
import { ItemService } from './../item/item.service';
import { CategoryService } from './../category/category.service';
import { LoginService } from './../login/login.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from './messages/snackbar/snackbar.component';
import { NgModule, ModuleWithProviders } from "@angular/core";
import { InputComponent } from "./input/input.component";
import { NotificationService } from './messages/notification.service';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        InputComponent,
        SnackbarComponent,
        PaginationComponent
    ],
    exports: [
        InputComponent,
        SnackbarComponent,
        PaginationComponent,
        FormsModule, 
        ReactiveFormsModule
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