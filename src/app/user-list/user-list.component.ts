import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import {MatDialog} from '@angular/material';

let uId;


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  interval: any;
  allUsers: any[];
  constructor(
    private getUsers: UserService,
    public dialog: MatDialog
  ) { };

  openDialog() {
    const dialogRef = this.dialog.open(AddUserPopUp, {
      height: '400px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  };

  deleteConfirmDialog(userId) {
    const dialogRef = this.dialog.open(DeleteUserPopup, {
      height: '350px',
      width: '400px',
    });
    uId = userId;
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      console.log( userId);
    });
  };

  ngOnInit() {
    this.getUsers.getAllUsers().subscribe(result => {
      this.allUsers = result;
    });
    this.interval = setInterval(() => {
      this.getUsers.getAllUsers().subscribe(result => {
        this.allUsers = result;
      });
    }, 1000);
  }
}


@Component({
  selector: 'add-user-popup',
  templateUrl: 'add-user-popup.html',
})
export class AddUserPopUp {
  fullName: String;
  user: String;
  address: String;
  contactNumber: String;
  emailAddress: String;
  role: String;

  constructor(
    private addNewUser: UserService,
  ) { };

  addUser() {
    const userObj = {
      fullName : this.fullName,
      user: this.user,
      role: this.role,
        address: this.address,
        contactNumber: this.contactNumber,
        emailAddress: this.emailAddress
    };
    this.addNewUser.addNewUser(userObj).subscribe(res => {
      console.log(res);
    });
  };
}

@Component({
  selector: 'delete-user-popup',
  templateUrl: 'delete-user-popup.html',
})
export class DeleteUserPopup {
  constructor(
    private delUser: UserService,
  ) { };
  deleteUser() {
    this.delUser.deleteUser(uId).subscribe(res => {
      console.log(res);
    });
  }
}
