import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import {MAT_CHECKBOX_CLICK_ACTION} from '@angular/material/checkbox';
import { MatDialog } from '@angular/material';



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
              private router: Router,
              public dialog: MatDialog,) { }

  ngOnInit() {
  }

    loggingData() {
    const user = {
      userName: this.email,
      password: this.password
    };
    this.auth.loggingData(user).subscribe(result => {
        if (result.success) {
            this.auth.storeData(result);
            this.router.navigate(['/dashboard']);
        } else {
            this.router.navigate(['/login']);
            this.auth.displayMessage(result, 'danger', 'top');
        }
        });
    }
    forgotPassword() {
        const dialogRef = this.dialog.open(ForgotPasswordPopup, {
            height: '360px',
            width: '400px',
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
            // console.log( index);
        });
    };
    helpSupport(){
        const dialogRef = this.dialog.open(HelpSupportPopup, {
            height: '360px',
            width: '400px',
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
            // console.log( index);
        });
    }
}

@Component({
    selector: 'forgot-password-popup',
    templateUrl: 'forgot-password-popup.html'
})
export class ForgotPasswordPopup{
    
}

@Component({
    selector: 'help-support-popup',
    templateUrl: 'help-support-popup.html'
})
export class HelpSupportPopup{
    
}

