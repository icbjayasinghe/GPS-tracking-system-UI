import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router'


@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
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

            }
        });
    }
}
