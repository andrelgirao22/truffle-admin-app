import { Component, OnInit } from '@angular/core';
import { Login } from './login.model';
import { LoginService } from './login.service';

import { Router } from '@angular/router'

@Component({
  selector: 'truffle-adm-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  message: string
  
  constructor(
    private loginService: LoginService,
    private router: Router) { }

  ngOnInit() {
  }

  login(login: Login) {
    this.loginService.authenticate(login, () => {
      if(this.authenticated()) {
        this.router.navigateByUrl('/home')
      } else {
        this.message = "Usuário ou senha inválido"
      }
    })
  }

  authenticated(): boolean {
    return this.loginService.authenticated
  }

}
