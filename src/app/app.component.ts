import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Menu, MenuItem } from './menu/menu.model';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
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
