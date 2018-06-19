import { LoginService } from './../login/login.service';
import { Router } from '@angular/router';
import { Menu, MenuItem } from './menu.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'truffle-adm-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  username: string

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
    private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.emitterLoggerIn.subscribe(_isLoggerIn => {
      this.username = this.loginService.getLocalStorage().getItem("username")
    })

    if(!this.username && this.loginService.isLoggedIn()) {
      this.username = this.loginService.getLocalStorage().getItem("username")
    }
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

  loggout() {
    this.menuItemSelected = undefined
    this.loginService.logout()
    this.router.navigateByUrl('/login')
  }
}
