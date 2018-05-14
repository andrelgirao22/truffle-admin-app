import { Observable } from 'rxjs/Observable';
import { Item } from './item.model';
import { Injectable } from "@angular/core";
import { TRUFFLE_API } from './../truffle.adm.api';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { NotificationService } from '../shared/messages/notification.service';
import { LoginService } from '../login/login.service';

@Injectable()
export class ItemService {

    url:string = `${TRUFFLE_API}/item`

    constructor(
        private http: HttpClient,
        private loginService: LoginService,
        private notificationService: NotificationService) {}

    setMessage(message: string) {
        this.notificationService.notify(message)
    }

    getItens(): Observable<Item[]> {
        return this.http.get<Item[]>(this.url, {headers: this.getHeaders()})
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

    addItem(item: Item) {

        if(item.id) {
            return this.http.put<Item>(`${this.url}/${item.id}`, JSON.stringify(item), {headers: this.getHeaders()})
        } else {
            return this.http.post<Item>(`${this.url}`, JSON.stringify(item), {headers: this.getHeaders()})
        }
    }

    sendImage(file: any, id: string) {
        return this.http.post(`${this.url}/image/${id}`, file, {headers: this.getHeaders()})
    }

    delete(id: number) {
        return this.http.delete<Item>(`${this.url}/${id}`, {headers: this.getHeaders()})
    }

    getHeaders() {
        return new HttpHeaders()
            .set('Authorization','Bearer ' + this.loginService.getLoginAuth().access_token)
            .set('Content-Type', 'application/json')
    }

}