import { LoginService } from './../login/login.service';
import { Router } from '@angular/router';
import { Menu, MenuItem } from './menu.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'truffle-adm-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  menus: Menu[] = [
    {name: 'Cadastro', itemMenu: [{item: 'Categoria', link: '/category'},{item: 'Item', link: '/item'}]},
    {name: 'Operacional', itemMenu: [{item: 'Pedidos', link: '/order'}]},
    {name: 'Sistema', itemMenu: [{item: 'Usuários', link: '/user'}]}
  ]
  
  constructor(
    private router: Router,
    private loginService: LoginService) { }

  ngOnInit() {
  }

  autenticated(): boolean {
    return this.loginService.authenticated
  }

  navigateTo(menuItem: MenuItem) {
    this.router.navigateByUrl(menuItem.link)
  }

  logout() {
    this.router.navigateByUrl('')
    this.loginService.authenticated = false
  }
}
