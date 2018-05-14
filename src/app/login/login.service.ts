import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Login } from './login.model';
import { Injectable } from '@angular/core';
import { TRUFFLE_API } from '../truffle.adm.api';

import 'rxjs/add/operator/do'

@Injectable()
export class LoginService {

  authenticated: boolean = false

  url: string = TRUFFLE_API

  loginAuthenticated: Login

  constructor(private http:HttpClient) { }
  
  login(email: string, password: string): Observable<Login> {
    return this.http.post<Login>(`${this.url}/auth/login`, {username: email, password: password})
      .do(user => {
        this.loginAuthenticated = user
      })
  }

  isLoggedIn(): boolean {
    return this.loginAuthenticated !==  undefined
  }

  loggout() {
    this.loginAuthenticated = undefined
  }

  getLoginAuth() {
    return this.loginAuthenticated
  }

  authenticate(login: Login, callback) {
    //this.authenticated = 
      //login.email === 'admin' && login.password === '123'
  //  return callback()
  }
}
