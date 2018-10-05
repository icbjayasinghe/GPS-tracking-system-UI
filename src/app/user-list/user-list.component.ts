import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import {MatDialog} from '@angular/material';

//user list component
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  interval: any;
  allUsers: any[];
  constructor(
    private getUsers:UserService,
    public dialog: MatDialog
  ) { };

  openDialog() {
    const dialogRef = this.dialog.open(AddUserPopUp,{
      height: '400px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  };

  ngOnInit() {
    this.getUsers.getAllUsers().subscribe(result=>{
      this.allUsers = result;
    });
    this.interval = setInterval(() => { 
      this.getUsers.getAllUsers().subscribe(result=>{
        this.allUsers = result;
      });
    }, 1000);
  }
}

//add user popup component
@Component({
  selector: 'add-user-popup',
  templateUrl: 'add-user-popup.html',
})
export class AddUserPopUp {
  userName: String;
  userType: String;
  userStatus: String;

  constructor(
    private addNewUser:UserService,
  ) { };

  addUser(){
    const userObj = { 
      name:this.userName,
      password:this.userName,
	    userType:this.userType,
	    status:this.userStatus
    }
    this.addNewUser.addNewUser(userObj).subscribe(res=>{
      console.log(res);
    });
  };
}