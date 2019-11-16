import { NotificationService } from './../shared/messages/notification.service';
import { OrderNotifyService } from './order.notifity.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
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

  searchForm: FormGroup
  searchControlForm: FormControl
  orderSelected: Order;
 
  constructor(
    private orderService: OrderService,
    private orderNotifyService: OrderNotifyService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder){}

  ngOnInit() {

    this.searchControlForm = this.formBuilder.control('')

    this.searchForm = this.formBuilder.group({
      search : this.searchControlForm
    })

    /*this.searchControlForm.valueChanges.switchMap(term => {})
      .subscribe(result => {
        
      })*/

  }

  loadOrders(pagination: Pagination) {
    
    this.pagination = pagination
    this.pagination.orderby = "id"
    this.orderService.getOrder(this.pagination).subscribe(_page => {
      if(_page) {
        this.page = _page
        this.orders = _page.content
        this.orderNotifyService.notify(this.orders)
      }

    }, error =>{
      console.log('error', error)
    })
  }

  getPage() {
    return this.page
  }

  changeStatus() {
    let _order = this.orderSelected
    _order.status = this.getNewStatus(_order.status)
    this.orderService.setOrder(_order).subscribe(data => {
      this.notificationService.notify(`Status do Pedido alterado para ${_order.status}`)
    },  error => {
      console.log(error)
      this.notificationService.notify(`Problemas para altera o Status do Pedido: ${error}`)
    })
  }

  getNewStatus(statusCurrent: string) {
    switch(statusCurrent) {
      case "PENDENTE": return "PREPARANDO"
      case "PREPARANDO": return "PRONTO"
      case "PRONTO": return "CONCLUIDO"
      default: return ""
    }
  }
  

  setOrder(_order: Order) {
    this.orderSelected = _order
  }

  isPeding(_order: Order): boolean {
    return _order.status === 'PENDENTE'
  }

  isDoing(_order: Order): boolean {
    return _order.status === 'PREPARANDO'
  }

  isDone(_order: Order): boolean {
    return _order.status === 'PRONTO'
  }

  isClosed(_order: Order) {
    return _order.status === 'CONCLUIDO'
  }

}
