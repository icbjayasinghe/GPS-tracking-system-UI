import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private auth: AuthService,
                private router: Router) {}
  canActivate() {
      if (this.auth.loggedIn()) {
          return true;
      } else {
          this.router.navigate(['/login']);
          localStorage.clear();
          return false;
      }
  }
}
