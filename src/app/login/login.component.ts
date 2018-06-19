
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControlName, FormGroupName, FormBuilder, Validators } from '@angular/forms';
import { Login } from './login.model';
import { LoginService } from './login.service';

import { Router } from '@angular/router'
import { NotificationService } from '../shared/messages/notification.service';

@Component({
  selector: 'truffle-adm-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  message: string

  loginForm: FormGroup
  
  constructor(
    private loginService: LoginService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      password: this.formBuilder.control('', [Validators.required]) 
    })
  }

  login() {
   this.loginService
    .login(this.loginForm.value.email, this.loginForm.value.password)
    .subscribe(user => {
      this.loginService.setSession(user)
      this.message = ""
      this.router.navigateByUrl('/')
      this.notificationService.notify(`Bem vindo ${user.account.name}`) 
    },
    error => {
      if(error) {
        this.message = "Email ou Senha inválidos"
      }
    })
    
  }

  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn()
  }

  logout() {
    this.loginService.logout()
    this.router.navigate(["/"])
  }

}
