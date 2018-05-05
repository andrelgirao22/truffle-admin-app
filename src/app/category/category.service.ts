import { NotificationService } from './../shared/messages/notification.service';

import { Category } from './category.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { TRUFFLE_API } from '../truffle.adm.api';

@Injectable()
export class CategoryService {

    url:string = `${TRUFFLE_API}/category`

    constructor(
        private http: HttpClient,
        private notificationService: NotificationService) {}

    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.url)
    }

    getCategory(id: string) {
        return this.http.get<Category>(`${this.url}/${id}`)
    }
      
    getImage(imageUrl: string) {
        let uri = `${this.url}/${imageUrl}/image`
        return this.http.get(uri)
    }

    addCategory(category: any) {

        let httpOptions = this.getHttpOptions()
        console.log(`${this.url}`)
        if(category.id) {
            return  this.http.put<Category>(`${this.url}/${category.id}`, JSON.stringify(category), httpOptions)
        } else {
            return  this.http.post<Category>(`${this.url}`, JSON.stringify(category), httpOptions)
        }
    }

    delete(id: number) {
        let httpOptions = this.getHttpOptions()
        return this.http.delete<Category>(`${this.url}/${id}`, httpOptions) 
    }

    sendImage(file: any, id: string) {
        return this.http.post(`${this.url}/image/${id}`, file)
    }

    setCategory(category: Category) {
        let httpOptions = this.getHttpOptions()
        return this.http.put<Category>(`${this.url}`, JSON.stringify(category), httpOptions)
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