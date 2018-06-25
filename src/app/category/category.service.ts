import { NotificationService } from './../shared/messages/notification.service';

import { Category } from './category.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { TRUFFLE_API } from '../truffle.adm.api';
import { LoginService } from '../login/login.service';

@Injectable()
export class CategoryService implements HttpInterceptor {

    urlCategoryPage:string = `${TRUFFLE_API.baseUrl}/category/page`
    urlCategory:string = `${TRUFFLE_API.baseUrl}/category`

    constructor(
        private http: HttpClient,
        private loginService: LoginService,
        private notificationService: NotificationService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
        let token = ""
        if(this.loginService.isLoggedIn()) {
            token = this.loginService.getLocalStorage().getItem('access_token')
            req.headers.set('Authorization', token)
        }
        
        let event = next.handle(req)
        return event
    }

    getCategories(parameters: string): Observable<any> {
        let url = this.urlCategoryPage
        if(parameters) url += `${parameters}` 
        console.log(url)
        return this.http.get<Category[]>(url)
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

    getHeadersOnlyToken() {
        let token = ""
        if(this.loginService.isLoggedIn()) {
            token = this.loginService.getLocalStorage().getItem('access_token')
        }
        return new HttpHeaders()
            .set('Authorization','Bearer ' + token)
    }

    getCategory(id: string) {
        return this.http.get<Category>(`${this.urlCategory}/${id}`, {headers: this.getHeaders()})
    }
    
    addCategory(category: any): Observable<any> {
        console.log(`${this.urlCategory}`)
        if(category.id) {
            return  this.http.put<Category>(`${this.urlCategory}/${category.id}`, JSON.stringify(category))
        } else {
            return  this.http.post<Category>(
                `${this.urlCategory}`, 
                JSON.stringify(category), 
                {headers: this.getHeaders(), observe: 'response'},)
        }
    }

    delete(id: number) {
        return this.http.delete<Category>(`${this.urlCategory}/${id}`, {headers: this.getHeaders()}) 
    }

    deletePicture(id: number) {
        return this.http.delete<Category>(`${this.urlCategory}/picture/${id}`, {headers: this.getHeaders()}) 
    }

    sendImage(file: any, id: string) {
        return this.http.post(`${this.urlCategory}/picture/${id}`, file, {headers: this.getHeadersOnlyToken()})

    }

    setCategory(category: Category) {
        
        return this.http.put<Category>(`${this.urlCategory}`, JSON.stringify(category), {headers: this.getHeaders()})
    }
}