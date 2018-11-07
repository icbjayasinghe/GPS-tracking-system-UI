import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Http, Headers} from '@angular/http';
import { map} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {
  user: any;
  token: any;
  profile: any;

  constructor(private http: Http,
              private router: Router ) { }

    loggingData(user) {
    this.user = user;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const url = 'http://localhost:3000/login';
    return this.http.post(url, this.user, { headers: headers}).pipe(map(res => res.json()));
    }

    storeData(result) {
        this.profile = {
            _id: result._id,
            address: result.address,
            contactNumber: result.contactNumber,
            emailAddress: result.emailAddress,
            fullName: result.fullName,
            status: result.status,
            userName: result.userName,
            role: result.role};
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(this.profile));
        this.user = this.profile;
    }

    fetchToken() {
      if (!tokenNotExpired('token')) {
          localStorage.clear();
          this.router.navigate(['/login']);
          window.location.reload();
      }
        this.token = localStorage.getItem('token');
    }

    findUser() {
      this.user = JSON.parse(localStorage.getItem('user'));
      return this.user.role === 'Admin';
    }

    logout() {
      this.token = null ;
      this.user = null ;
      localStorage.clear();
    }
}


