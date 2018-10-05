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

}