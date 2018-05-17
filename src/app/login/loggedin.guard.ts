import { CanLoad } from "@angular/router";
import { Route } from "@angular/compiler/src/core";
import { Injectable } from "@angular/core";
import { LoginService } from "./login.service";

@Injectable()
export class LoggedInGuard implements CanLoad {

    constructor(private loginService: LoginService) {}

    canLoad(route: Route): boolean {
        const loggedIn = this.loginService.isLoggedIn()
        if(!loggedIn) {
            this.loginService.handleLogin()
        }

        return loggedIn
    }

}