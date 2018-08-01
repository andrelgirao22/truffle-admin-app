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
 
  constructor(
    private orderService: OrderService,
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
      }

    }, error =>{
      console.log('error', error)
    })
  }

  getPage() {
    return this.page
  }

  changeStatus(_order: Order) {
    switch(_order.status) {
      case "PENDENTE": _order.status = "PREPARANDO"; break;
      case "PREPARANDO": _order.status = "PRONTO"; break;
      case "PRONTO": _order.status = "FECHADO"; break;
    }
    
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
    return _order.status === 'FECHADO'
  }

}
