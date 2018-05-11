import { TRUFFLE_API } from './../truffle.adm.api';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from './order.model';

@Injectable()
export class OrderService {

    url: string = `${TRUFFLE_API}/order`

    constructor(private http: HttpClient) {}

    getOrder():Observable<Order> {
        return this.http.get<Order>(this.url)
    }

    setOrder(order: Order) {
        let httpHeaders = this.getHttpOptions()
        this.http.put(this.url, JSON.stringify(order), httpHeaders)
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

}