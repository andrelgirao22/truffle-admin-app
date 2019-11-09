import { Injectable } from "@angular/core";
import { TRUFFLE_API } from "../truffle.adm.api";
import { HttpClient } from "@angular/common/http";
import { NotificationService } from "../shared/messages/notification.service";
import { Pagination } from "../shared/pagination/pagination.model";
import { Observable } from "rxjs";

@Injectable()
export class AccountService {

    urlCategoryPage:string = `${TRUFFLE_API.baseUrl}/account/page`
    urlCategory:string = `${TRUFFLE_API.baseUrl}/account`

    constructor(
        private http: HttpClient,
        private notificationService: NotificationService) {}


    setMessage(message: string) {
        this.notificationService.notify(message)
    }

    getCategories(pagination: Pagination, search?:string): Observable<any> {
        return this.http.get<Account[]>(this.urlCategoryPage, 
            {params: {
                page: `${pagination.page}`,
                linesPerPage: `${pagination.linesPerPage}`,
                orderby: pagination.orderby,
                direction: pagination.direction,
                name:search ? search : ''
            } 
        })
    }

    getAll(): Observable<any> {
        return this.http.get<Account[]>(this.urlCategory)
    }

    getCategory(id: string) {
        return this.http.get<Account>(`${this.urlCategory}/${id}`)
    }
    
    addCategory(category: any): Observable<any> {
        console.log(`${this.urlCategory}`)
        if(category.id) {
            return  this.http.put<Account>(
                    `${this.urlCategory}/${category.id}`, 
                    JSON.stringify(category))
        } else {
            return  this.http.post<Account>(
                `${this.urlCategory}`, 
                JSON.stringify(category), 
                {observe: 'response'},)
        }
    }

    delete(id: number) {
        return this.http.delete<Account>(`${this.urlCategory}/${id}`) 
    }


    update(category: Account) {
        return this.http.put<Account>(`${this.urlCategory}/${category.id}`, JSON.stringify(category))
    }

}