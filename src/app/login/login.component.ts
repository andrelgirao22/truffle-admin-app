import { Component, OnInit } from '@angular/core';
import { Login } from './login.model';

@Component({
  selector: 'truffle-adm-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  message: string
  isSignedFailed: boolean = false

  constructor() { }

  ngOnInit() {
  }

  login(login: any): void {
    console.log(login)
    if(login.username === 'admin' && login.password === '123') {
      this.isSignedFailed = false
      
    } else {
      this.message = "Usuário ou senha inválido"
      this.isSignedFailed = true
    }
  }

}
