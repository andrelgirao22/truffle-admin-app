import { Pagination } from './../pagination/pagination.model';
import { Injectable } from "../../../../node_modules/@angular/core";
import { OrderService } from "../../order/order.service";
import { OrderNotifyService } from "../../order/order.notifity.service";


@Injectable()
export class TaskService {

    constructor(
        private orderService: OrderService,
        private orderNotifyService: OrderNotifyService
    ) {}


    public checkPendingOrder() {
        let pagination = new Pagination()
        pagination.linesPerPage = 10
        pagination.orderby = "id"
        this.orderService.getOrder(pagination).subscribe(data => {
            if(data) {
                this.orderNotifyService.notify(data.content)
            }
        }, error => {})
    }
}