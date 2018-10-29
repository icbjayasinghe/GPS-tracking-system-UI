import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'


@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {
  email: string;
  password: string;

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

    loggingData() {
    const user = {
      userName: this.email,
      password: this.password
    };
    this.auth.loggingData(user).subscribe(result => {
            console.log(result);
        });
    }
}
