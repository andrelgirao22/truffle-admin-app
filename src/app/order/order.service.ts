import { Pagination } from './../shared/pagination/pagination.model';
import { TRUFFLE_API } from './../truffle.adm.api';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from './order.model';
import { LoginService } from '../login/login.service';

@Injectable()
export class OrderService {

    url: string = `${TRUFFLE_API.baseUrl}`

    constructor(
        private http: HttpClient,
        private loginService: LoginService) {}

    getOrder(pagination: Pagination, search?:string):Observable<any> {
        return this.http.get<Order>(`${this.url}/order/page`,
        {headers: this.getHeaders(),
            params: {
                page: `${pagination.page}`,
                linesPerPage: `${pagination.linesPerPage}`,
                orderby: pagination.orderby,
                direction: pagination.direction,
                name:search ? search : ''
            }
        })
    }

    setOrder(order: Order): Observable<any> {
        let httpHeaders = this.getHttpOptions()
        return this.http.put(`${this.url}/${order.id}`, JSON.stringify(order), httpHeaders)
    }


    getHttpOptions(): any {

        let httpOptions = {
            headers: new HttpHeaders({
            'Content-Type': 'application/json',
            //'Content-Type': 'multipart/form-data',
            //'Content-Type': 'false',
              //'Authorization': 'my-auth-token'
            })
        }

        return httpOptions
    }

    getHeaders() {
        let token = ""
        if(this.loginService.isLoggedIn()) {
            token = this.loginService.getLocalStorage().getItem('access_token')
        }
        return new HttpHeaders()
            .set('Authorization','Bearer ' + token)
            .set('Content-Type', 'application/json')
    }

}