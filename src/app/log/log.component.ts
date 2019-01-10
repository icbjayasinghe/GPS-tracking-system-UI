import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import {MAT_CHECKBOX_CLICK_ACTION} from '@angular/material/checkbox';



@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css'],
    providers: [{provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check'}]
})
export class LogComponent implements OnInit {
  email: string;
  password: string;

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

    loggingData() {
    const user = {
      userName: this.email,
      password: this.password
    };
    this.auth.loggingData(user).subscribe(result => {
        if (result.success) {
            console.log(result);
            this.auth.storeData(result);
            this.router.navigate(['/dashboard']);
        } else {
            console.log(result);
            this.router.navigate(['/login']);
            this.auth.displayMessage(result, 'danger', 'top');
        }
        });
    }
}
