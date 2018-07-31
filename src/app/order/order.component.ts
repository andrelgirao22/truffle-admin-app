import { OrderService } from './order.service';
import { Pagination } from './../shared/pagination/pagination.model';
import { Order } from './order.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'truffle-adm-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders: Order [] = []
  page: any
  pagination: Pagination
 
  constructor(
    private orderService: OrderService){}

  ngOnInit() {
  }

  loadOrders(pagination: Pagination) {
    
    this.pagination = pagination
    this.pagination.orderby = "id"
    this.orderService.getOrder(this.pagination).subscribe(_page => {
      if(_page) {
        this.page = _page
        this.orders = _page.content
      }

    }, error =>{
      console.log('error', error)
    })
  }

  getPage() {
    return this.page
  }

}
