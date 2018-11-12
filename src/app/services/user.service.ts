import { Injectable } from '@angular/core';
import { Http,Headers} from '@angular/http';
import { map} from 'rxjs/operators';
import {AuthService} from './auth.service';

@Injectable()
export class UserService {
    constructor(private http: Http,
                private auth: AuthService) {}

    getAllUsers(){
        const headers = new Headers();
        this.auth.fetchToken();
        headers.append('Authorization', this.auth.token);
        headers.append('Content-Type', 'application/json');
        const url = 'http://localhost:3000/api/user';
        return this.http.get(url, {headers: headers}).pipe(map(res => res.json()));
    }

    addNewUser(userObj){
        const headers = new Headers();
        this.auth.fetchToken();
        headers.append('Authorization', this.auth.token);
        headers.append('Content-Type', 'application/json');
        const url = 'http://localhost:3000/api/user';
        return this.http.post(url, userObj, { headers: headers}).pipe(map(res => res.json()));
    }

    deleteUser(userId){
        console.log(userId);
        const headers = new Headers();
        this.auth.fetchToken();
        headers.append('Authorization', this.auth.token);
        headers.append('Content-Type', 'application/json');
        const url = 'http://localhost:3000/api/user/deleteUser/' + userId;
        return this.http.get(url, { headers: headers}).pipe(map(res => res.json()));
    }

    changePassword(userPasswordDetails) {
        const headers = new Headers();
        this.auth.fetchToken();
        headers.append('Authorization', this.auth.token);
        headers.append('Content-Type', 'application/json');
        const url = 'http://localhost:3000/api/user/changePassword';
        return this.http.post(url, userPasswordDetails, { headers: headers}).pipe(map(res => res.json()));
    }
    restPassword(userRestPasswordDetails) {
        const headers = new Headers();
        this.auth.fetchToken();
        headers.append('Authorization', this.auth.token);
        headers.append('Content-Type', 'application/json');
        const url = 'http://localhost:3000/api/user/restPassword';
        return this.http.post(url, userRestPasswordDetails, { headers: headers}).pipe(map(res => res.json()));
    }
}
