import { LoginService } from './../login/login.service';
import { Router } from '@angular/router';
import { Menu, MenuItem } from './menu.model';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { OrderNotifyService } from '../order/order.notifity.service';
import { Order } from '../order/order.model';
import { TaskService } from '../shared/tasks/task.service';

@Component({
  selector: 'truffle-adm-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  username: string
  orders: Order[] = []

  menus: Menu[] = [
    {name: 'Cadastro', icon: 'fa fa-database', itemMenu: [
      {item: 'Categoria', link: '/category'},
      {item: 'Item', link: '/item'}
    ]},
    {name: 'Operacional', icon: 'fa fa-reorder', itemMenu: [
      {item: 'Pedidos', link: '/order'}
    ]},
    {name: 'Sistema', icon: 'fa fa-gear', itemMenu: [
      {item: 'Usuários', link: '/user'}
    ]}
  ]
  
  menuItemSelected: MenuItem

  constructor(
    private router: Router,
    private loginService: LoginService,
    private orderNotifyService: OrderNotifyService,
    private taskService: TaskService) { }

  ngOnInit() {
    this.loginService.emitterLoggerIn.subscribe(_isLoggerIn => {
      this.username = this.loginService.getLocalStorage().getItem("username")
    })

    if(!this.username && this.loginService.isLoggedIn()) {
      this.username = this.loginService.getLocalStorage().getItem("username")
    }

    this.orderNotifyService.orderNotify.subscribe(_orders => {
      this.orders = _orders
    })

    this.taskService.checkPendingOrder()
  }

  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn()
  }

  navigateTo(menuItem: MenuItem) {
    this.menuItemSelected = menuItem
    
  }

  login() {
    this.router.navigateByUrl('/login')
  }

  logout() {
    this.menuItemSelected = undefined
    this.loginService.logout()
    this.router.navigateByUrl('/login')
  }

  hasOrderToNotify(): boolean {
    return this.orders.filter(_order => _order.status === 'PENDENTE' || _order.status === 'PREPARANDO').length > 0
  }

  getCountOrder(): number {
    return this.orders.filter(_order => _order.status === 'PENDENTE' || _order.status === 'PREPARANDO').length
  }

  getCountPendingOrders(): number {
    return this.orders.filter(_order => _order.status === 'PENDENTE').length
  }

  getCountDoingOrders(): number {
    return this.orders.filter(_order => _order.status === 'PREPARANDO').length
  }
}
