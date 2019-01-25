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
    deleteVehicleConfirmDialog() {
        const dialogRef = this.dialog.open(ForgotPasswordPopup, {
            height: '350px',
            width: '400px',
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
            // console.log( index);
        });
    };
}

@Component({
    selector: 'forgot-password-popup',
    templateUrl: 'forgot-password-popup.html'
})
export class ForgotPasswordPopup{
    
}

