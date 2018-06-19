import { Observable } from 'rxjs';
import { CanLoad, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from "@angular/router";
import { Injectable } from "@angular/core";
import { LoginService } from "./login.service";

@Injectable()
export class LoggedInGuard implements CanLoad, CanActivate {

    constructor(
        private loginService: LoginService,
        private router: Router) {}

    canLoad(route: Route): boolean {
        let url: string = route.path
        console.log("ola" + url);
        
        if(this.loginService.isLoggedIn()) {
            return true
        }

        this.router.navigate([this.loginService.getLoginUrl()])
        return false
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        
        console.log("Can Activate")
        if(this.loginService.isLoggedIn()) {
            return true
        }

        this.router.navigate([this.loginService.getLoginUrl()])
        return false
    }

}