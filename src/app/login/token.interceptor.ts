import { Observable } from 'rxjs/Observable';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginService } from './login.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private loginService: LoginService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(this.loginService.getLoginAuth().access_token)
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.loginService.getLoginAuth().access_token}`
            }
        })

        
        return next.handle(request)
    }
} 