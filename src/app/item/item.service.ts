import { ImageUtilService } from './../services/image-util.service';
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
        private notificationService: NotificationService,
        private imageUtilSevice: ImageUtilService) {}

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

    
    insert(item: Item): Observable<any> {
        return this.http.post<Item>(`${this.url}`, JSON.stringify(item), {headers: this.getHeaders(), observe: 'response'})
    }
    
    update(item: Item): Observable<any> {
        return this.http.put<Item>(`${this.url}/${item.id}`, JSON.stringify(item), {headers: this.getHeaders()})
    }
    
    getImage(id: string, index: string): Observable<any> {
        let uri = `${this.url}/picture/${id}/index/${index}`
        return this.http.get(uri, {headers: this.getHeaders(), observe: 'response', responseType: 'blob'})
    }

    deleteImage(id: string, index: string) {
        let uri = `${this.url}/picture/${id}/index/${index}`
        return this.http.delete<Item>(`${uri}`, {headers: this.getHeaders()})
    }
    
    sendImage(id: string, filename: string, image) {

        let imageBlob = this.imageUtilSevice.dataUriToBlob(image)
        let formData: FormData = new FormData()
  
        formData.set('file', imageBlob, filename)
  
        return this.http.post<any>(`${this.url}/picture/${id}`, formData, {headers: this.getHeadersOnlyToken(), observe: 'response'})
    }

    delete(id: number) {
        return this.http.delete<Item>(`${this.url}/${id}`, {headers: this.getHeaders()})
    }

    deletePicture(id: number) {
        return this.http.delete<Item>(`${this.url}/picture/${id}`, {headers: this.getHeaders()})
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