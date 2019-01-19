import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Http, Headers} from '@angular/http';
import { map} from 'rxjs/operators';
import {Router} from '@angular/router';

declare var $: any;

@Injectable()
export class AuthService {
    user: any;
    token: any;
    profile: any;

    constructor(private http: Http,
                private router: Router) {
    }

    loggingData(user) {
        this.user = user;
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const url = 'http://10.10.1.8:80/login';
        return this.http.post(url, this.user, {headers: headers}).pipe(map(res => res.json()));
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
            role: result.role
        };
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
        this.trackLogoutTime().subscribe(result => {
            console.log(result.message);
            this.token = null;
            this.user = null;
            localStorage.clear();
        });
    }

    trackLogoutTime() {
        const headers = new Headers();
        this.fetchToken();
        headers.append('Authorization', this.token);
        headers.append('Content-Type', 'application/json');

        const url = 'http://10.10.1.8:80/api/user/trackLogoutTime/' + JSON.parse(localStorage.getItem('user'))._id;
        return this.http.get(url, {headers: headers}).pipe(map(res => res.json()));
    }

    loggedIn() {
        return tokenNotExpired('token');
    }

    getProfileData() {
        return JSON.parse(localStorage.getItem('user'));
    }

    displayMessage(result, type, position) {
        $.notify({
            icon: 'done_outline',
            message: result.msg

        }, {
            type: type,
            timer: 4000,
            placement: {
                from: position,
                align: 'center'
            },
            template:
                '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" ' +
                'role="alert">' +
                '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  ' +
                '<i class="material-icons">close</i></button>' +
                '<i class="material-icons" data-notify="icon">check_circle</i> ' +
                '<span data-notify="title">{1}</span> ' +
                '<span data-notify="message">{2}</span>' +
                '<div class="progress" data-notify="progressbar">' +
                '<div class="progress-bar progress-bar-{0}" ' +
                'role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                '</div>' +
                '<a href="{3}" target="{4}" data-notify="url"></a>' +
                '</div>'
        });

    }

}


