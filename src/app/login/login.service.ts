import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Login } from './login.model';
import { Injectable, EventEmitter } from '@angular/core';
import { TRUFFLE_API } from '../truffle.adm.api';

import 'rxjs/add/operator/do'
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import * as moment from "moment";

@Injectable()
export class LoginService {

  status: boolean
  authenticated: boolean = false
  statusChange = new Subject<boolean>()
  emitterLoggerIn = new EventEmitter<boolean>()

  url: string = TRUFFLE_API.baseUrl

  constructor(
      private http:HttpClient,
      private router: Router) { }
  
  login(email: string, password: string): Observable<Login> {
    return this.http.post<Login>(`${this.url}/auth/login`, {username: email, password: password})
  }

  setSession(login: Login) {
    const expiresAt = moment().add(login.expires_in, "seconds")
    localStorage.setItem("username", login.account.email)
    localStorage.setItem("access_token", login.access_token)
    localStorage.setItem("expires_at", JSON.stringify(login.expires_in.valueOf()))
    this.changeStatus();
    this.emitterLoggerIn.emit(this.isLoggedIn())
  }

  logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("access_token");
    localStorage.removeItem("expires_at");
    this.changeStatus();
  }

  public isLoggedIn(): boolean {
    return moment().isBefore(this.getTimeExpirationToken());
  }

  getTimeExpirationToken() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  changeStatus() {
    this.status = this.isLoggedIn();
    this.statusChange.next(this.status);
  }

  getLocalStorage() {
    return localStorage
  }

  getLoginUrl(): string {
    return '/login'
  }
}
