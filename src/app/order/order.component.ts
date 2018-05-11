import { Order } from './order.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'truffle-adm-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders: Order [] = []
 
  constructor() { }

  ngOnInit() {
  }

}
