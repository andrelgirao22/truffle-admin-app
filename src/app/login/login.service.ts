import { Login } from './login.model';
import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {

  authenticated: boolean = false

  constructor() { }
  
  authenticate(login: Login, callback) {
    this.authenticated = 
      login.username === 'admin' && login.password === '123'
    return callback()
  }
}
