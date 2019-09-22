import { Pagination } from './../shared/pagination/pagination.model';
import { NotificationService } from './../shared/messages/notification.service';

import { Category } from './category.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { TRUFFLE_API } from '../truffle.adm.api';
import { LoginService } from '../login/login.service';
import { ImageUtilService } from '../services/image-util.service';

@Injectable()
export class CategoryService implements HttpInterceptor {

    urlCategoryPage:string = `${TRUFFLE_API.baseUrl}/category/page`
    urlCategory:string = `${TRUFFLE_API.baseUrl}/category`

    constructor(
        private http: HttpClient,
        private loginService: LoginService,
        private notificationService: NotificationService,
        private imageUtilSevice: ImageUtilService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
        let token = ""
        if(this.loginService.isLoggedIn()) {
            token = this.loginService.getLocalStorage().getItem('access_token')
            req.headers.append('Authorization', token)
        }
        
        let event = next.handle(req)
        return event
    }

    setMessage(message: string) {
        this.notificationService.notify(message)
    }

    getCategories(pagination: Pagination, search?:string): Observable<any> {
        return this.http.get<Category[]>(this.urlCategoryPage, 
            {params: {
                page: `${pagination.page}`,
                linesPerPage: `${pagination.linesPerPage}`,
                orderby: pagination.orderby,
                direction: pagination.direction,
                name:search ? search : ''
            } 
        })
    }

    getAllCategories(): Observable<any> {
        return this.http.get<Category[]>(this.urlCategory, {headers: this.getHeaders()})
    }

    /*getCategoriesByName(parameters: string, search?:string): Observable<any> {
        let url = `${this.urlCategoryPage}/name/${search} `
        if(parameters) url += `${parameters}` 
        console.log(url)
        return this.http.get<Category[]>(url)
    }*/

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
            return  this.http.put<Category>(
                    `${this.urlCategory}/${category.id}`, 
                    JSON.stringify(category),
                    {headers: this.getHeaders()})
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

    getImage(id: string, index: string): Observable<any> {
        let uri = `${this.urlCategory}/picture/${id}/index/${index}`
        return this.http.get(uri, {headers: this.getHeaders(), observe: 'response', responseType: 'blob'})
    }

    deleteImage(id: string, index: string) {
        let uri = `${this.urlCategory}/picture/${id}/index/${index}`
        return this.http.delete<Category>(`${uri}`, {headers: this.getHeaders()})
    }
    
    sendImage(id: string, filename: string, image) {

        let imageBlob = this.imageUtilSevice.dataUriToBlob(image)
        let formData: FormData = new FormData()
  
        formData.set('file', imageBlob, filename)
  
        return this.http.post<any>(`${this.urlCategory}/picture/${id}`, formData, {headers: this.getHeadersOnlyToken(), observe: 'response'})
    }

    update(category: Category) {
        return this.http.put<Category>(`${this.urlCategory}/${category.id}`, JSON.stringify(category), {headers: this.getHeaders()})
    }
}