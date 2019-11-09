import { Injectable } from "@angular/core";
import { TRUFFLE_API } from "../truffle.adm.api";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Pagination } from "../shared/pagination/pagination.model";
import { Observable } from "rxjs";
import { LoginService } from "../login/login.service";
import { Account } from "./account.model";

@Injectable()
export class AccountService {

    urlPage:string = `${TRUFFLE_API.baseUrl}account/page`
    url:string = `${TRUFFLE_API.baseUrl}account`

    constructor(
        private http: HttpClient,
        private loginService: LoginService) {}

    get(pagination: Pagination, search?:string): Observable<any> {
        return this.http.get<Account[]>(this.urlPage, 
            {params: {
                page: `${pagination.page}`,
                linesPerPage: `${pagination.linesPerPage}`,
                orderby: pagination.orderby,
                direction: pagination.direction,
                name:search ? search : ''
            } 
        , headers: this.getHeaders()})
    }

    getById(id: string) {
        return this.http.get<Account>(`${this.url}/${id}`, {headers: this.getHeaders()})
    }

    getAll(): Observable<any> {
        return this.http.get<Account[]>(this.url, {headers: this.getHeaders()})
    }


    update(obj: Account) {
        return this.http.put<Account>(`${this.url}/${obj.id}`, JSON.stringify(obj))
    }

    add(obj: Account) {
        return  this.http.post<Account>(`${this.url}`, JSON.stringify(obj), {headers: this.getHeaders(), observe: 'response'},)
    }

    getHeaders() {
        return new HttpHeaders()
            .set('Authorization','Bearer ' + this.loginService.getLocalStorage().getItem('access_token'))
            .set('Content-Type', 'application/json')
    }

}