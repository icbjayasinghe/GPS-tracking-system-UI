import { Injectable } from '@angular/core';
import { Http,Headers} from '@angular/http';
import { map} from 'rxjs/operators';

@Injectable()
export class UserService {
    constructor(private http: Http) {}

    getAllUsers(){
        const url = "http://localhost:3000/users"
        return this.http.get(url).pipe(map(res=>res.json()));
    }

    addNewUser(userObj){
        let headers = new Headers();
        headers.append('Content-Type','application/json');
        const url ="http://localhost:3000/signup";
        return this.http.post(url,userObj,{headers:headers}).pipe(map(res=>res.json()));
    }

    deleteUser(userId){
        let headers = new Headers();
        headers.append('Content-Type','application/json');
        const url ="http://localhost:3000/userDelete/"+userId;
        return this.http.put(url,userId).pipe(map(res=>res.json()));
    }
}