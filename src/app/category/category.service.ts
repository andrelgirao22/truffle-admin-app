import { NotificationService } from './../shared/messages/notification.service';

import { Category } from './category.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { TRUFFLE_API } from '../truffle.adm.api';
import { LoginService } from '../login/login.service';

@Injectable()
export class CategoryService {

    url:string = `${TRUFFLE_API}/category`

    constructor(
        private http: HttpClient,
        private loginService: LoginService,
        private notificationService: NotificationService) {}

    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.url, {headers: this.getHeaders()})
    }

    getHeaders() {
        return new HttpHeaders()
            .set('Authorization','Bearer ' + this.loginService.getLoginAuth().access_token)
            .set('Content-Type', 'application/json')
    }

    getCategory(id: string) {
        return this.http.get<Category>(`${this.url}/${id}`, {headers: this.getHeaders()})
    }
      
    getImage(imageUrl: string) {
        let uri = `${this.url}/${imageUrl}/image`
        return this.http.get(uri, {headers: this.getHeaders()})
    }

    addCategory(category: any) {

        console.log(`${this.url}`)
        if(category.id) {
            return  this.http.put<Category>(`${this.url}/${category.id}`, JSON.stringify(category), {headers: this.getHeaders()})
        } else {
            return  this.http.post<Category>(`${this.url}`, JSON.stringify(category), {headers: this.getHeaders()})
        }
    }

    delete(id: number) {
        
        return this.http.delete<Category>(`${this.url}/${id}`, {headers: this.getHeaders()}) 
    }

    sendImage(file: any, id: string) {
        return this.http.post(`${this.url}/image/${id}`, file, {headers: this.getHeaders()})
    }

    setCategory(category: Category) {
        
        return this.http.put<Category>(`${this.url}`, JSON.stringify(category), {headers: this.getHeaders()})
    }

   /* getHttpOptions(): any {

        let token: string = this.loginService.getLoginAuth().access_token

        let httpOptions = {
            headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            })
        }

        return httpOptions
    }*/

}