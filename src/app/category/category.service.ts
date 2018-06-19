import { NotificationService } from './../shared/messages/notification.service';

import { Category } from './category.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { TRUFFLE_API } from '../truffle.adm.api';
import { LoginService } from '../login/login.service';

@Injectable()
export class CategoryService {

    urlCategoryPage:string = `${TRUFFLE_API.baseUrl}/category/page`
    urlCategory:string = `${TRUFFLE_API.baseUrl}/category`

    constructor(
        private http: HttpClient,
        private loginService: LoginService,
        private notificationService: NotificationService) {}

    getCategories(parameters: string): Observable<any> {
        let url = this.urlCategoryPage
        if(parameters) url += `${parameters}` 
        console.log(url)
        return this.http.get<Category[]>(url, {headers: this.getHeaders()})
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

    getCategory(id: string) {
        return this.http.get<Category>(`${this.urlCategory}/${id}`, {headers: this.getHeaders()})
    }
    
    addCategory(category: any) {
        console.log(`${this.urlCategory}`)
        if(category.id) {
            return  this.http.put<Category>(`${this.urlCategory}/${category.id}`, JSON.stringify(category), {headers: this.getHeaders()})
        } else {
            return  this.http.post<Category>(`${this.urlCategory}`, JSON.stringify(category), {headers: this.getHeaders()})
        }
    }

    delete(id: number) {
        return this.http.delete<Category>(`${this.urlCategory}/${id}`, {headers: this.getHeaders()}) 
    }

    sendImage(file: any, id: string) {
        return this.http.post(`${this.urlCategory}/image/${id}`, file, {headers: this.getHeaders()})
    }

    setCategory(category: Category) {
        
        return this.http.put<Category>(`${this.urlCategory}`, JSON.stringify(category), {headers: this.getHeaders()})
    }
}