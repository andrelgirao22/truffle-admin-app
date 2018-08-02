import { Injectable, EventEmitter } from '@angular/core';
import { Order } from './order.model';


@Injectable()
export class OrderNotifyService {

    orderNotify = new EventEmitter<Order[]>()

    constructor() {}

    notify(_orders: Order[]) {
        this.orderNotify.emit(_orders)
    }

}