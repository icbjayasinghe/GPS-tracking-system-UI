import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
//import {CONSTANTS} from '../app.constant';
import {map, catchError} from 'rxjs/operators';
import { Observable } from "rxjs";

@Injectable()
export class UserService {
    constructor(private http: HttpClient) {}

    handleError(arg0: any): any {
    }

    loginUser(user:any):Observable<any> {
        return this.http.post(`/api/login`, user).pipe(map((res:Response) => {
            return res;
          }),catchError(this.handleError));
    }

    register(user:any):Observable<any> {
        return this.http.post(`/api/signup`, user).pipe(map((res:Response) => {
            return res;
          }),catchError(this.handleError));
    }

    getToke() {
        return sessionStorage.getItem("token") || null;
    }

    saveToken(token) {
        sessionStorage.setItem("token", token);
    }

    saveUser(user) {
        sessionStorage.setItem("user", JSON.stringify(user));
    }

    setNull() {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
    }

    getUser() {
        return JSON.parse(sessionStorage.getItem("user")) || null;
    }

    getUserFromServer():Observable<any> {
        return this.http.post(`/api/user`, {token:this.getToke()}).pipe(map((res:Response) => {
            return res;
          }),catchError(this.handleError));
    }

    validateUser():Observable<boolean> {
        return this.http.post(`/api/user/validate`, {token:this.getToke()}).pipe(map((res:{success}) => {
            return res.success;
          }),catchError(this.handleError));
    }

}