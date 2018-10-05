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
  allUsers: any[];
  constructor(
    private getUsers:UserService,
    public dialog: MatDialog
  ) { };

  openDialog() {
    const dialogRef = this.dialog.open(AddUserPopUp);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  };

  ngOnInit() {
    this.getUsers.getAllUsers().subscribe(result=>{
      this.allUsers = result;
    });
  }
}

//add user popup component
@Component({
  selector: 'add-user-popup',
  templateUrl: 'add-user-popup.html',
})
export class AddUserPopUp {}