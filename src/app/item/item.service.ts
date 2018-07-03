import { Pagination } from './../shared/pagination/pagination.model';
import { Observable } from 'rxjs/Observable';
import { Item } from './item.model';
import { Injectable } from "@angular/core";
import { TRUFFLE_API } from './../truffle.adm.api';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { NotificationService } from '../shared/messages/notification.service';
import { LoginService } from '../login/login.service';

@Injectable()
export class ItemService {

    url:string = `${TRUFFLE_API.baseUrl}/item`

    constructor(
        private http: HttpClient,
        private loginService: LoginService,
        private notificationService: NotificationService) {}

    setMessage(message: string) {
        this.notificationService.notify(message)
    }

    getItens(pagination: Pagination, _search?: string): Observable<any> {
        let url = `${this.url}/page`
        console.log('url',url);
        
        return this.http.get<Item[]>(`${url}`, 
            {
                headers: this.getHeaders(),
                params: {
                    page: `${pagination.page}`,
                    linesPerPage: `${pagination.linesPerPage}`,
                    orderby: pagination.orderby,
                    direction: pagination.direction,
                    search:_search ? _search : ''
                }
            })
    }

    getPriceType(): Observable<any> {
        return this.http.get(`${this.url}/priceType`, {headers: this.getHeaders()})
    }

    getItem(id: string) {
        return this.http.get<Item>(`${this.url}/${id}`, {headers: this.getHeaders()})
    }

    getImage(imageUrl: string) {
        let uri = `${this.url}/${imageUrl}/image`
        return this.http.get(uri, {headers: this.getHeaders()})
    }

    addItem(item: Item): Observable<any> {

        if(item.id) {
            console.log('item', item);
            console.log('url put item', this.url);
            return this.http.put<Item>(`${this.url}/${item.id}`, JSON.stringify(item), {headers: this.getHeaders()})
        } else {
            return this.http.post<Item>(`${this.url}`, JSON.stringify(item), {headers: this.getHeaders(), observe: 'response'})
        }
    }

    sendImage(file: any, id: string) {
        return this.http.post(`${this.url}/picture/${id}`, file, {headers: this.getHeadersOnlyToken()})
    }

    delete(id: number) {
        return this.http.delete<Item>(`${this.url}/${id}`, {headers: this.getHeaders()})
    }

    getHeaders() {
        return new HttpHeaders()
            .set('Authorization','Bearer ' + this.loginService.getLocalStorage().getItem('access_token'))
            .set('Content-Type', 'application/json')
    }

    getHeadersOnlyToken() {
        let token = ""
        if(this.loginService.isLoggedIn()) {
            token = this.loginService.getLocalStorage().getItem('access_token')
        }
        return new HttpHeaders()
            .set('Authorization','Bearer ' + token)
    }

}