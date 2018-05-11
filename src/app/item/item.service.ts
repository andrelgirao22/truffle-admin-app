import { Observable } from 'rxjs/Observable';
import { Item } from './item.model';
import { Injectable } from "@angular/core";
import { TRUFFLE_API } from './../truffle.adm.api';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { NotificationService } from '../shared/messages/notification.service';

@Injectable()
export class ItemService {

    url:string = `${TRUFFLE_API}/item`

    constructor(
        private http: HttpClient,
        private notificationService: NotificationService) {}

    setMessage(message: string) {
        this.notificationService.notify(message)
    }

    getItens(): Observable<Item[]> {
        return this.http.get<Item[]>(this.url)
    }

    getPriceType(): Observable<any> {
        return this.http.get(`${this.url}/priceType`)
    }

    getItem(id: string) {
        return this.http.get<Item>(`${this.url}/${id}`)
    }

    getImage(imageUrl: string) {
        let uri = `${this.url}/${imageUrl}/image`
        return this.http.get(uri)
    }

    addItem(item: Item) {

        let httpOptions = this.getHttpOptions()
        console.log(`${this.url}`)
        if(item.id) {
            return this.http.put<Item>(`${this.url}/${item.id}`, JSON.stringify(item), httpOptions)
        } else {
            return this.http.post<Item>(`${this.url}`, JSON.stringify(item), httpOptions)
        }
    }

    sendImage(file: any, id: string) {
        return this.http.post(`${this.url}/image/${id}`, file)
    }

    delete(id: number) {
        let httpOptions = this.getHttpOptions()
        return this.http.delete<Item>(`${this.url}/${id}`, httpOptions)
    }

    getHttpOptions(): any {

        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
              //'Authorization': 'my-auth-token'
            })
        }

        return httpOptions
    }

}