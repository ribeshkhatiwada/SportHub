import { Injectable, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as jwt_decode from "jwt-decode";


@NgModule({
    providers: [AuthService]
})

export class AuthService {
    baseUrl = 'http://localhost:5000/api/auth/';
    valueControl = 'http://localhost:5000/api/user/'

    constructor(private http: HttpClient) { }

    login(model: any) {
        return this.http.post(this.baseUrl + 'login', model)
            .pipe(
                map((response: any) => {
                    const user = response;
                    if (user) {
                        localStorage.setItem('token', user.token);
                    }
                })
            );
    }

    register(model: any) {
        return this.http.post(this.baseUrl + 'register', model);
    }
    loggedIn() {
        return !!localStorage.getItem('token');
    }

    getDecodedAccessToken(token: string): any {
        try {
            return jwt_decode(token);
        }
        catch (Error) {
            return null;
        }
    }
    getID() {
        const token1 = localStorage.getItem('token');
        let decodedToken = this.getDecodedAccessToken(token1);
        if (decodedToken == null) {
            localStorage.removeItem('token');
            window.alert("something went wrong");
        }
        return parseInt(decodedToken["nameid"]);
    }

    getUsername(){
        const token1 = localStorage.getItem('token');
        let decodedToken = this.getDecodedAccessToken(token1);
        if (decodedToken == null) {
            localStorage.removeItem('token');
            window.alert("something went wrong");
        }
        return decodedToken["unique_name"];
    }

    getTeamIDs(UserId: Number) {
        return this.http.get(this.valueControl + 'userId=' + UserId);
    }
}

