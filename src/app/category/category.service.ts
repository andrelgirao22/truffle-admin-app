
import { Category } from './category.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { TRUFFLE_API } from '../truffle.adm.api';

@Injectable()
export class CategoryService {

    url:string = `${TRUFFLE_API}/category`

    constructor(private http: HttpClient) {}

    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.url)
    }
      
    getImage(imageUrl: string) {
        let uri = `${this.url}/${imageUrl}/image`
        return this.http.get(uri)
    }

    addCategory(category: Category) {

        let httpOptions = this.getHttpOptions()
        console.log(`${this.url}`)
        return  this.http.post<Category>(`${this.url}`, JSON.stringify(category), httpOptions)
    }

    setCategory(category: Category) {
        let httpOptions = this.getHttpOptions()
        return this.http.put<Category>(`${this.url}`, JSON.stringify(category), httpOptions)
    }

    getHttpOptions(): any {

        let httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              //'Authorization': 'my-auth-token'
            })
        }

        return httpOptions
    }

}