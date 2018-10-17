import { Component, OnInit } from '@angular/core';
import { VehicleServiceService} from '../services/vehicle-service.service';
import {MatDialog} from '@angular/material';
import { NotificationsComponent} from '../notifications/notifications.component'
var vId;
var vehi;
declare var $: any;
@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent implements OnInit {
  interval: any;
  allVehicles: any[];
  vehicleNo: String;
  deviceImei: String;
  userName: String;
  vehicleDetails: String;
  constructor(
    private getVehicles: VehicleServiceService,
    public dialog: MatDialog
  ) { };

  openDialog() {
    const dialogRef = this.dialog.open(AddVehiclePopup,{
      height: '400px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  };

  deleteConfirmDialog(vehicleId){
    const dialogRef = this.dialog.open(DeleteVehiclePopup,{
      height: '350px',
      width: '400px',
    });
    vId=vehicleId;
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      //console.log( vehicleId);
    });
  };

  updateDialog(vehicle){
    vehi = vehicle;
    const dialogRef = this.dialog.open(UpdateVehiclePopup,{
      height: '400px',
      width: '600px',
    },);
    
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      //console.log(vehi);
    });
    //console.log(vehi);
    //this.vehicleDetails=vehi;
    
  }

  ngOnInit() {
    this.getVehicles.getAllVehicles().subscribe(result=>{
      this.allVehicles = result;
    });
    this.interval = setInterval(() => { 
      this.getVehicles.getAllVehicles().subscribe(result=>{
        this.allVehicles = result;
      });
    }, 1000);
  }
}

@Component({
  selector: 'add-vehicle-popup',
  templateUrl: 'add-vehicle-popup.html',
})
export class AddVehiclePopup {
  vehicleNo: String;
  deviceImei: String;
  userName: String;
  vehicleDetails: String;
  //notification: NotificationsComponent
  constructor(
    private addNewVehicles:VehicleServiceService,
    //private notification: NotificationsComponent
  ) { };

  addVehicle(){
    const vehicleObj = { 
      vehicleNo:this.vehicleNo,
	    Imie:this.deviceImei,
	    userName:this.userName,
	    details:this.vehicleDetails
    }
    
    this.addNewVehicles.addNewVehicle(vehicleObj).subscribe(res=>{
      if(res.success){
        
        const type = ['success'];
        //const color = Math.floor((Math.random() * 4) + 1);
        $.notify({
          icon: "done_outline",
          message: "Successfully added<b> new vehicle</b> "

      },{
          type: 'success',
          timer: 4000,
          placement: {
              from: "top",
              align: "center"
          },
          template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<i class="material-icons" data-notify="icon">check_circle</i> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
              '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
      });
        //this.notification.showNotification('top','left');      
      }
      else{
        const type = ['success'];
        //const color = Math.floor((Math.random() * 4) + 1);
        $.notify({
          icon: "done_outline",
          message: "Somthing went <b> wrong</b> "

        },{
          type: 'danger',
          timer: 4000,
          placement: {
              from: "top",
              align: "center"
          },
          template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">error</i></button>' +
            '<i class="material-icons" data-notify="icon">check_circle</i> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
              '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
        });
      };
    });
  };
}

@Component({
  selector: 'delete-vehicle-popup',
  templateUrl: 'delete-vehicle-popup.html',
})
export class DeleteVehiclePopup {
  constructor(
    private delVehicles:VehicleServiceService,
  ) { };
  deleteVehicle(){
    this.delVehicles.deleteVehicle(vId).subscribe(res=>{
      if(res.success){
        //const type = ['success'];
        //const color = Math.floor((Math.random() * 4) + 1);
        $.notify({
          icon: "done_outline",
          message: "Vehicle <b> deleted</b> "

      },{
          type: 'danger',
          timer: 4000,
          placement: {
              from: "top",
              align: "center"
          },
          template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<i class="material-icons" data-notify="icon">check_circle</i> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
              '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
      });
      }
      else{
        //const type = ['success'];
        //const color = Math.floor((Math.random() * 4) + 1);
        $.notify({
          icon: "done_outline",
          message: "Somthing went <b> wrong</b> "

      },{
          type: 'danger',
          timer: 4000,
          placement: {
              from: "top",
              align: "center"
          },
          template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<i class="material-icons" data-notify="icon">error</i> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
              '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
      });

      };
    });
  }
}

@Component({
  selector: 'update-vehicle-popup',
  templateUrl: 'update-vehicle-popup.html',
})
export class UpdateVehiclePopup {
  id = vehi._id;
  vehicleNo = vehi.vehicleNo;
  deviceImei = vehi.imeiNo;
  userName = vehi.userName;
  vehicleDetails = vehi.vehicleDetails;
  
  constructor(
    private updVehicles:VehicleServiceService
  ) { };
  updateVehicle(){
    const vehicleObj = { 
      vehicleNo:this.vehicleNo,
	    Imie:this.deviceImei,
	    userName:this.userName,
	    details:this.vehicleDetails
    }
    this.updVehicles.updateVehicle(this.id,vehicleObj).subscribe(res=>{
      if(res.success){
        //const type = ['success'];
        //const color = Math.floor((Math.random() * 4) + 1);
        $.notify({
          icon: "done_outline",
          message: "Vehicle successfully <b> updated</b> "

      },{
          type: 'success',
          timer: 4000,
          placement: {
              from: "top",
              align: "center"
          },
          template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<i class="material-icons" data-notify="icon">check_circle</i> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
              '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
      });

      }
      else{
        const type = ['success'];
        //const color = Math.floor((Math.random() * 4) + 1);
        $.notify({
          icon: "done_outline",
          message: "Successfully added<b> new vehicle</b> "

      },{
          type: 'danger',
          timer: 4000,
          placement: {
              from: "top",
              align: "center"
          },
          template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<i class="material-icons" data-notify="icon">error</i> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
              '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
      });
        

      }
    });
    //console.log(this.id);
    // this.delVehicles.deleteVehicle(vId).subscribe(res=>{
    //   console.log(res);
    // });
  }
}


