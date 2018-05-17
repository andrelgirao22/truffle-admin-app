import { CommonModule } from '@angular/common';
import { SnackbarComponent } from './messages/snackbar/snackbar.component';
import { NgModule } from "@angular/core";
import { InputComponent } from "./input/input.component";
import { NotificationService } from './messages/notification.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        InputComponent,
        SnackbarComponent
    ],
    exports: [
        InputComponent,
        SnackbarComponent
    ],
    providers: [
        NotificationService
    ]
})
export class SharedModule {

}